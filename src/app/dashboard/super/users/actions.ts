"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES = ["SUPER_ADMIN", "SCHOOL_ADMIN", "MENTOR", "PARENT", "BREAK_GLASS"] as const;
type RoleValue = (typeof ROLES)[number];
const SCHOOL_SCOPED: RoleValue[] = ["SCHOOL_ADMIN", "MENTOR", "PARENT"];

export type UserActionState = { errors: string[]; success?: string };

// Every mutation enforces its own authority — never trusts that the proxy
// upstream ran (established pattern from addSchoolAction).
async function requireSuperAdmin(): Promise<
  { ok: true; actorId: string } | { ok: false; state: UserActionState }
> {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "SUPER_ADMIN" && role !== "BREAK_GLASS") {
    return { ok: false, state: { errors: ["You do not have permission to manage users."] } };
  }
  return { ok: true, actorId: session!.user.id };
}

function validateRoleSchoolPair(role: string, schoolId: string): string[] {
  const errors: string[] = [];
  if (!ROLES.includes(role as RoleValue)) errors.push("Invalid role.");
  if (SCHOOL_SCOPED.includes(role as RoleValue) && !schoolId)
    errors.push(`${role.replace("_", " ")} accounts must belong to a school.`);
  if (!SCHOOL_SCOPED.includes(role as RoleValue) && schoolId)
    errors.push(`${role.replace("_", " ")} accounts must not be tied to one school (they are cross-school by design).`);
  return errors;
}

export async function createUserAction(
  _prev: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  const gate = await requireSuperAdmin();
  if (!gate.ok) return gate.state;

  const email = ((formData.get("email") as string) || "").trim().toLowerCase();
  const name = ((formData.get("name") as string) || "").trim();
  const role = (formData.get("role") as string) || "";
  const schoolId = (formData.get("schoolId") as string) || "";
  const password = (formData.get("password") as string) || "";

  const errors: string[] = [];
  if (!EMAIL_RE.test(email)) errors.push("A valid email is required.");
  if (name.length < 2) errors.push("Name is required.");
  if (password.length < 12) errors.push("Password must be at least 12 characters.");
  errors.push(...validateRoleSchoolPair(role, schoolId));
  if (errors.length > 0) return { errors };

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return { errors: [`An account with ${email} already exists.`] };

    if (schoolId) {
      const school = await prisma.school.findUnique({ where: { id: schoolId } });
      if (!school) return { errors: ["Selected school no longer exists."] };
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: role as RoleValue,
        schoolId: schoolId || null,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: gate.actorId,
        action: "USER_CREATE",
        // Deliberately no password material in audit detail — ever.
        detail: { targetUserId: user.id, email: user.email, role: user.role, schoolId: user.schoolId },
      },
    });

    revalidatePath("/dashboard/super/users");
    return { errors: [], success: `${user.name} (${user.role.replace("_", " ")}) created.` };
  } catch (err) {
    console.error("[createUser] failed:", err);
    return { errors: ["Something went wrong creating the user. Please try again."] };
  }
}

export async function updateUserAction(
  _prev: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  const gate = await requireSuperAdmin();
  if (!gate.ok) return gate.state;

  const userId = (formData.get("userId") as string) || "";
  const name = ((formData.get("name") as string) || "").trim();
  const role = (formData.get("role") as string) || "";
  const schoolId = (formData.get("schoolId") as string) || "";
  const newPassword = (formData.get("newPassword") as string) || "";

  const errors: string[] = [];
  if (!userId) errors.push("Missing user.");
  if (name.length < 2) errors.push("Name is required.");
  if (newPassword && newPassword.length < 12) errors.push("New password must be at least 12 characters.");
  errors.push(...validateRoleSchoolPair(role, schoolId));
  if (errors.length > 0) return { errors };

  try {
    const target = await prisma.user.findUnique({ where: { id: userId } });
    if (!target) return { errors: ["User not found."] };

    // Lockout rail: never allow demoting the LAST active SUPER_ADMIN.
    // With no PC/CLI access, a locked-out platform is unrecoverable
    // without database surgery this user cannot perform.
    if (target.role === "SUPER_ADMIN" && role !== "SUPER_ADMIN") {
      const otherSupers = await prisma.user.count({
        where: { role: "SUPER_ADMIN", isActive: true, id: { not: target.id } },
      });
      if (otherSupers === 0) {
        return { errors: ["This is the last active super admin — demoting it would lock everyone out. Create another super admin first."] };
      }
    }

    if (schoolId) {
      const school = await prisma.school.findUnique({ where: { id: schoolId } });
      if (!school) return { errors: ["Selected school no longer exists."] };
    }

    await prisma.user.update({
      where: { id: target.id },
      data: {
        name,
        role: role as RoleValue,
        schoolId: schoolId || null,
        ...(newPassword ? { passwordHash: await bcrypt.hash(newPassword, 12) } : {}),
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: gate.actorId,
        action: "USER_UPDATE",
        detail: {
          targetUserId: target.id,
          changes: { name, role, schoolId: schoolId || null, passwordChanged: Boolean(newPassword) },
        },
      },
    });

    revalidatePath("/dashboard/super/users");
    return { errors: [], success: `${name} updated.` };
  } catch (err) {
    console.error("[updateUser] failed:", err);
    return { errors: ["Something went wrong updating the user. Please try again."] };
  }
}

export async function setUserActiveAction(
  _prev: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  const gate = await requireSuperAdmin();
  if (!gate.ok) return gate.state;

  const userId = (formData.get("userId") as string) || "";
  const makeActive = formData.get("makeActive") === "true";

  try {
    const target = await prisma.user.findUnique({ where: { id: userId } });
    if (!target) return { errors: ["User not found."] };

    if (!makeActive) {
      // Lockout rails, both checked server-side (UI hiding is not security):
      if (target.id === gate.actorId) {
        return { errors: ["You cannot deactivate your own account."] };
      }
      if (target.role === "SUPER_ADMIN") {
        const otherSupers = await prisma.user.count({
          where: { role: "SUPER_ADMIN", isActive: true, id: { not: target.id } },
        });
        if (otherSupers === 0) {
          return { errors: ["This is the last active super admin — deactivating it would lock everyone out."] };
        }
      }
    }

    await prisma.user.update({ where: { id: target.id }, data: { isActive: makeActive } });

    await prisma.auditLog.create({
      data: {
        userId: gate.actorId,
        action: makeActive ? "USER_REACTIVATE" : "USER_DEACTIVATE",
        detail: { targetUserId: target.id, email: target.email },
      },
    });

    revalidatePath("/dashboard/super/users");
    return { errors: [], success: `${target.name} ${makeActive ? "reactivated" : "deactivated"}.` };
  } catch (err) {
    console.error("[setUserActive] failed:", err);
    return { errors: ["Something went wrong. Please try again."] };
  }
}
