"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export type AddSchoolState = { errors: string[]; success?: string };

export async function addSchoolAction(
  _prev: AddSchoolState,
  formData: FormData
): Promise<AddSchoolState> {
  // Defense in depth: the proxy already gates /dashboard/super, but an
  // action is its own POST endpoint and must enforce its own authority.
  // Never trust that the layer above did its job.
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "BREAK_GLASS") {
    return { errors: ["You do not have permission to add schools."] };
  }

  const name = ((formData.get("name") as string) || "").trim();
  const address = ((formData.get("address") as string) || "").trim();

  const errors: string[] = [];
  if (name.length < 3) errors.push("School name must be at least 3 characters.");
  if (name.length > 120) errors.push("School name is too long.");

  const slug = slugify(name);
  if (!slug) errors.push("School name must contain letters or numbers.");

  if (errors.length > 0) return { errors };

  const existing = await prisma.school.findFirst({
    where: { OR: [{ slug }, { name: { equals: name, mode: "insensitive" } }] },
  });
  if (existing) {
    return { errors: [`A school named "${existing.name}" already exists.`] };
  }

  const school = await prisma.school.create({
    data: { name, slug, address: address || null },
  });

  // Every tenant creation is an auditable event — same standard as
  // break-glass logins. If a rogue admin adds a fake school, the trail exists.
  await prisma.auditLog.create({
    data: {
      userId: session!.user.id,
      action: "SCHOOL_CREATE",
      detail: { schoolId: school.id, name: school.name, slug: school.slug },
    },
  });

  revalidatePath("/dashboard/super");
  return { errors: [], success: `${school.name} added.` };
}

export async function updateSchoolAction(
  _prev: AddSchoolState,
  formData: FormData
): Promise<AddSchoolState> {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "BREAK_GLASS") {
    return { errors: ["You do not have permission to edit schools."] };
  }

  const schoolId = (formData.get("schoolId") as string) || "";
  const name = ((formData.get("name") as string) || "").trim();
  const address = ((formData.get("address") as string) || "").trim();

  const errors: string[] = [];
  if (!schoolId) errors.push("Missing school.");
  if (name.length < 3) errors.push("School name must be at least 3 characters.");
  if (name.length > 120) errors.push("School name is too long.");
  if (errors.length > 0) return { errors };

  try {
    const school = await prisma.school.findUnique({ where: { id: schoolId } });
    if (!school) return { errors: ["School not found."] };

    const clash = await prisma.school.findFirst({
      where: { name: { equals: name, mode: "insensitive" }, id: { not: schoolId } },
    });
    if (clash) return { errors: [`A school named "${clash.name}" already exists.`] };

    // Slug is deliberately NOT editable: /register resolves the school by
    // slug, and it's the stable tenant reference. Renaming the display
    // name is safe; changing the slug would silently break registration.
    await prisma.school.update({
      where: { id: schoolId },
      data: { name, address: address || null },
    });

    await prisma.auditLog.create({
      data: {
        userId: session!.user.id,
        action: "SCHOOL_UPDATE",
        detail: { schoolId, name, address: address || null },
      },
    });

    revalidatePath("/dashboard/super");
    return { errors: [], success: `${name} updated.` };
  } catch (err) {
    console.error("[updateSchool] failed:", err);
    return { errors: ["Something went wrong updating the school. Please try again."] };
  }
}

export async function deleteSchoolAction(
  _prev: AddSchoolState,
  formData: FormData
): Promise<AddSchoolState> {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "BREAK_GLASS") {
    return { errors: ["You do not have permission to delete schools."] };
  }

  const schoolId = (formData.get("schoolId") as string) || "";
  if (!schoolId) return { errors: ["Missing school."] };

  try {
    const school = await prisma.school.findUnique({
      where: { id: schoolId },
      include: { _count: { select: { students: true, users: true } } },
    });
    if (!school) return { errors: ["School not found."] };

    // Hard rail: a school holding students (minors' PII) or staff accounts
    // cannot be deleted in one click. Records must be explicitly moved or
    // removed first — deletion is for empty/mistaken entries only.
    if (school._count.students > 0 || school._count.users > 0) {
      return {
        errors: [
          `${school.name} still has ${school._count.students} student record(s) and ${school._count.users} staff account(s). Move or remove them first — schools with data cannot be deleted.`,
        ],
      };
    }

    await prisma.school.delete({ where: { id: schoolId } });

    await prisma.auditLog.create({
      data: {
        userId: session!.user.id,
        action: "SCHOOL_DELETE",
        detail: { schoolId, name: school.name, slug: school.slug },
      },
    });

    revalidatePath("/dashboard/super");
    return { errors: [], success: `${school.name} deleted.` };
  } catch (err) {
    console.error("[deleteSchool] failed:", err);
    return { errors: ["Something went wrong deleting the school. Please try again."] };
  }
}
