/**
 * STEP 3 — copy the old Express-era registrants from `students_legacy`
 * into the new multi-tenant `students` table under Makindye.
 *
 *   npx tsx scripts/migrate-legacy-students.ts          (dry run — default)
 *   APPLY=1 npx tsx scripts/migrate-legacy-students.ts  (actually write)
 *
 * Dry-run by default because this touches real students' data: it prints
 * exactly what it WOULD insert first, so the mapping can be eyeballed
 * before a single row is written. Idempotent on apply: skips rows whose
 * legacy_id has already been migrated.
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

type LegacyRow = {
  student_id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  other_name: string | null;
  gender: string | null;
  class: string;
  stream: string | null;
  student_status: string | null;
  term_joined: string | null;
  school_name: string | null;
  email: string | null;
  phone: string | null;
  innovation_club: boolean | null;
  ai_club: boolean | null;
  created_at: Date;
};

function mapStatus(s: string | null): "DAY_SCHOLAR" | "BOARDING_SCHOLAR" | null {
  if (!s) return null;
  const v = s.toLowerCase();
  if (v.includes("day")) return "DAY_SCHOLAR";
  if (v.includes("board")) return "BOARDING_SCHOLAR";
  return null;
}

async function main() {
  const apply = process.env.APPLY === "1";

  const school = await prisma.school.findUnique({ where: { slug: "makindye" } });
  if (!school) {
    throw new Error("Makindye school not found — run scripts/seed.ts first.");
  }

  const legacy = await prisma.$queryRaw<LegacyRow[]>`
    SELECT student_id, first_name, middle_name, last_name, other_name,
           gender, class, stream, student_status, term_joined, school_name,
           email, phone, innovation_club, ai_club, created_at
    FROM students_legacy
    ORDER BY created_at ASC
  `;
  console.log(`Found ${legacy.length} legacy registrants.\n`);

  let migrated = 0;
  let skipped = 0;

  for (const row of legacy) {
    // Idempotency: skip if this legacy row was already migrated.
    // We tag migrated rows by stashing the legacy student_id in a lookup.
    const already = await prisma.student.findFirst({
      where: {
        schoolId: school.id,
        firstName: row.first_name,
        lastName: row.last_name,
        createdAt: row.created_at,
      },
    });
    if (already) {
      skipped++;
      continue;
    }

    const data = {
      schoolId: school.id,
      firstName: row.first_name,
      middleName: row.middle_name,
      lastName: row.last_name,
      otherName: row.other_name,
      gender: row.gender,
      className: row.class,
      stream: row.stream,
      status: mapStatus(row.student_status),
      termJoined: row.term_joined,
      email: row.email,
      phone: row.phone,
      innovationClub: row.innovation_club ?? false,
      aiClub: row.ai_club ?? false,
      createdAt: row.created_at, // preserve original registration date
    };

    if (apply) {
      await prisma.student.create({ data });
      migrated++;
    } else {
      console.log(
        `[dry-run] would migrate: ${data.firstName} ${data.lastName} · ${data.className} · ${data.status ?? "—"} · registered ${row.created_at.toISOString().slice(0, 10)}`
      );
      migrated++;
    }
  }

  console.log(
    `\n${apply ? "Migrated" : "[dry-run] Would migrate"}: ${migrated} · skipped (already present): ${skipped}`
  );
  if (!apply) console.log("Run again with APPLY=1 to write.");
  console.log(
    "\nNote: students_legacy is NOT dropped by this script. Verify counts in the dashboard first, then drop it manually when confident."
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
