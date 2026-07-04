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
  const role = session?.user.role;
  if (role !== "SUPER_ADMIN" && role !== "BREAK_GLASS") {
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
