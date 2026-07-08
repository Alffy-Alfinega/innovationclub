"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type GalleryActionState = { errors: string[]; success?: string };

async function requireAdmin() {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "BREAK_GLASS") {
    return { ok: false as const, state: { errors: ["You do not have permission to manage the gallery."] } };
  }
  return { ok: true as const, actorId: session!.user.id };
}

const URL_RE = /^https?:\/\/.+/i;

export async function addProjectAction(
  _prev: GalleryActionState,
  formData: FormData
): Promise<GalleryActionState> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.state;

  const title = ((formData.get("title") as string) || "").trim();
  const url = ((formData.get("url") as string) || "").trim();
  const description = ((formData.get("description") as string) || "").trim();
  const trimester = (formData.get("trimester") as string) || "";
  const studentNames = ((formData.get("studentNames") as string) || "").trim();
  const schoolId = (formData.get("schoolId") as string) || "";

  const errors: string[] = [];
  if (title.length < 3) errors.push("Title must be at least 3 characters.");
  if (!URL_RE.test(url)) errors.push("A valid project URL (https://...) is required.");
  if (!trimester) errors.push("Trimester is required.");
  if (studentNames.length < 2) errors.push("Credit the student(s) who built it.");
  if (!schoolId) errors.push("School is required.");
  if (errors.length > 0) return { errors };

  try {
    const school = await prisma.school.findUnique({ where: { id: schoolId } });
    if (!school) return { errors: ["Selected school no longer exists."] };

    await prisma.project.create({
      data: {
        title,
        url,
        description: description || null,
        trimester,
        studentNames,
        schoolId,
        createdById: gate.actorId,
      },
    });

    revalidatePath("/dashboard/admin/gallery");
    revalidatePath("/projects");
    return { errors: [], success: `"${title}" added to the gallery.` };
  } catch (err) {
    console.error("[addProject] failed:", err);
    return { errors: ["Something went wrong adding the project. Please try again."] };
  }
}

export async function deleteProjectAction(
  _prev: GalleryActionState,
  formData: FormData
): Promise<GalleryActionState> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.state;

  const projectId = (formData.get("projectId") as string) || "";
  if (!projectId) return { errors: ["Missing project."] };

  try {
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) return { errors: ["Project not found."] };

    await prisma.project.delete({ where: { id: projectId } });

    revalidatePath("/dashboard/admin/gallery");
    revalidatePath("/projects");
    return { errors: [], success: `"${project.title}" removed.` };
  } catch (err) {
    console.error("[deleteProject] failed:", err);
    return { errors: ["Something went wrong removing the project. Please try again."] };
  }
}
