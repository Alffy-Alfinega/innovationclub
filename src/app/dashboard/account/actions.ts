"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export type ProfileActionState = { errors: string[]; success?: string };

export async function updateProfileAction(
  _prev: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const session = await auth();
  if (!session?.user) return { errors: ["You must be signed in."] };

  const name = ((formData.get("name") as string) || "").trim();
  const currentPassword = (formData.get("currentPassword") as string) || "";
  const newPassword = (formData.get("newPassword") as string) || "";

  const errors: string[] = [];
  if (name.length < 2) errors.push("Name is required.");
  if (newPassword && newPassword.length < 12) errors.push("New password must be at least 12 characters.");
  if (newPassword && !currentPassword) errors.push("Enter your current password to set a new one.");
  if (errors.length > 0) return { errors };

  try {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return { errors: ["Account not found."] };

    if (newPassword) {
      const valid = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!valid) return { errors: ["Current password is incorrect."] };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        ...(newPassword ? { passwordHash: await bcrypt.hash(newPassword, 12) } : {}),
      },
    });

    revalidatePath("/dashboard/account");
    return { errors: [], success: newPassword ? "Profile and password updated." : "Profile updated." };
  } catch (err) {
    console.error("[updateProfile] failed:", err);
    return { errors: ["Something went wrong. Please try again."] };
  }
}
