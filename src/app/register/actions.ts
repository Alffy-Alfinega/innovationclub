"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-\s]{7,20}$/;

export async function registerAction(
  _prevState: { errors: string[] },
  formData: FormData
): Promise<{ errors: string[] }> {
  const firstName = (formData.get("firstName") as string || "").trim();
  const lastName = (formData.get("lastName") as string || "").trim();
  const className = formData.get("className") as string;
  const email = (formData.get("email") as string || "").trim();
  const phone = (formData.get("phone") as string || "").trim();
  const agree = formData.get("agree");

  const errors: string[] = [];
  if (firstName.length < 2) errors.push("First name is required.");
  if (lastName.length < 2) errors.push("Last name is required.");
  if (!className) errors.push("Class is required.");
  if (!agree) errors.push("You must agree to the terms.");
  if (email && !EMAIL_RE.test(email)) errors.push("Please enter a valid email address.");
  if (phone && !PHONE_RE.test(phone)) errors.push("Please enter a valid phone number.");

  if (errors.length > 0) return { errors };

  // Single-school default preserved for now — becomes a school picker once
  // a second school is actually onboarded. Not solved "properly" here
  // because there's no second school to design against yet; over-building
  // this before real requirements exist is its own kind of waste.
  const school = await prisma.school.findUnique({ where: { slug: "makindye" } });
  if (!school) {
    return { errors: ["Registration is temporarily unavailable. Please contact the school directly."] };
  }

  await prisma.student.create({
    data: {
      schoolId: school.id,
      firstName,
      lastName,
      className,
      email: email || null,
      phone: phone || null,
      innovationClub: formData.get("innovationClub") === "on",
      aiClub: formData.get("aiClub") === "on",
    },
  });

  redirect("/register/success");
}
