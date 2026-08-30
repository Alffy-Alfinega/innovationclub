"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-\s]{7,20}$/;

// Kept identical to src/app/dashboard/admin/schools/actions.ts:slugify —
// same slug rules must produce the same slug for the same name in both
// places, or the same school could end up created twice under different
// slugs depending on which form was used.
function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function mapStatus(raw: string | null): "DAY_SCHOLAR" | "BOARDING_SCHOLAR" | null {
  if (!raw) return null;
  if (raw.toLowerCase().includes("day")) return "DAY_SCHOLAR";
  if (raw.toLowerCase().includes("board")) return "BOARDING_SCHOLAR";
  return null;
}

export type RegisterState = { errors: string[] };

export async function registerAction(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const firstName = ((formData.get("firstName") as string) || "").trim();
  const middleName = ((formData.get("middleName") as string) || "").trim();
  const lastName = ((formData.get("lastName") as string) || "").trim();
  const otherName = ((formData.get("otherName") as string) || "").trim();
  const gender = (formData.get("gender") as string) || "";
  const className = (formData.get("className") as string) || "";
  const stream = (formData.get("stream") as string) || "";
  const statusRaw = (formData.get("status") as string) || "";
  const termJoined = (formData.get("termJoined") as string) || "";
  const school = ((formData.get("school") as string) || "").trim();
  const email = ((formData.get("email") as string) || "").trim();
  const phone = ((formData.get("phone") as string) || "").trim();
  const innovationClub = formData.get("innovationClub") === "on";
  const aiClub = formData.get("aiClub") === "on";
  const agree = formData.get("agree");

  const errors: string[] = [];
  if (firstName.length < 2) errors.push("First name is required.");
  if (lastName.length < 2) errors.push("Last name is required.");
  if (!className) errors.push("Class is required.");
  if (school.length < 3) errors.push("School name is required.");
  if (!agree) errors.push("You must agree to the terms of participation.");
  if (email && !EMAIL_RE.test(email)) errors.push("Please enter a valid email address.");
  if (phone && !PHONE_RE.test(phone)) errors.push("Please enter a valid phone number.");

  if (errors.length > 0) return { errors };

  // Everything below touches the database. Wrapped end-to-end: a missing
  // table, a dropped connection, or any other DB-layer failure returns a
  // friendly inline error instead of crashing the whole page — this is
  // exactly the failure mode that hit 51 real registrants on 2026-07-04.
  try {
    const slug = slugify(school);
    if (!slug) {
      return { errors: ["School name must contain letters or numbers."] };
    }

    // Find by slug or case-insensitive name first — "Makindye Secondary
    // School" and "makindye secondary school" must resolve to the same
    // tenant, not create a duplicate. Only create a new School row if no
    // match exists.
    let schoolRecord = await prisma.school.findFirst({
      where: { OR: [{ slug }, { name: { equals: school, mode: "insensitive" } }] },
    });

    if (!schoolRecord) {
      try {
        schoolRecord = await prisma.school.create({
          data: { name: school, slug },
        });
      } catch (createErr) {
        // Race: two people registering for the same brand-new school at
        // once could both pass the findFirst check above and then collide
        // on the unique slug. Re-fetch instead of failing the registration.
        if (
          createErr instanceof Prisma.PrismaClientKnownRequestError &&
          createErr.code === "P2002"
        ) {
          schoolRecord = await prisma.school.findUnique({ where: { slug } });
        } else {
          throw createErr;
        }
      }
    }

    if (!schoolRecord) {
      return {
        errors: [
          "Registration is temporarily unavailable while we finish setting up. Please contact the school directly or try again shortly.",
        ],
      };
    }

    await prisma.student.create({
      data: {
        schoolId: schoolRecord.id,
        firstName,
        middleName: middleName || null,
        lastName,
        otherName: otherName || null,
        gender: gender || null,
        className,
        stream: stream || null,
        status: mapStatus(statusRaw),
        termJoined: termJoined || null,
        email: email || null,
        phone: phone || null,
        innovationClub,
        aiClub,
      },
    });
  } catch (err) {
    console.error("[register] failed:", err);
    if (
      err instanceof Prisma.PrismaClientKnownRequestError ||
      err instanceof Prisma.PrismaClientInitializationError
    ) {
      return {
        errors: [
          "We're having trouble reaching our systems right now. Nothing was lost — please try again in a few minutes.",
        ],
      };
    }
    return { errors: ["Something went wrong. Please try again."] };
  }

  redirect("/register/success");
}
