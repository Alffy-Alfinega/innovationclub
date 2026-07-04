"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-\s]{7,20}$/;

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
  const email = ((formData.get("email") as string) || "").trim();
  const phone = ((formData.get("phone") as string) || "").trim();
  const innovationClub = formData.get("innovationClub") === "on";
  const aiClub = formData.get("aiClub") === "on";
  const agree = formData.get("agree");

  const errors: string[] = [];
  if (firstName.length < 2) errors.push("First name is required.");
  if (lastName.length < 2) errors.push("Last name is required.");
  if (!className) errors.push("Class is required.");
  if (!agree) errors.push("You must agree to the terms of participation.");
  if (email && !EMAIL_RE.test(email)) errors.push("Please enter a valid email address.");
  if (phone && !PHONE_RE.test(phone)) errors.push("Please enter a valid phone number.");

  if (errors.length > 0) return { errors };

  // Everything below touches the database. Wrapped end-to-end: a missing
  // table, a dropped connection, or any other DB-layer failure returns a
  // friendly inline error instead of crashing the whole page — this is
  // exactly the failure mode that hit 51 real registrants on 2026-07-04.
  try {
    const school = await prisma.school.findUnique({ where: { slug: "makindye" } });
    if (!school) {
      return {
        errors: [
          "Registration is temporarily unavailable while we finish setting up. Please contact the school directly or try again shortly.",
        ],
      };
    }

    await prisma.student.create({
      data: {
        schoolId: school.id,
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
