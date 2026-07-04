/**
 * STEP 2 — seed the first school and the first SUPER_ADMIN.
 * Run AFTER `prisma migrate dev` has applied the schema.
 *
 *   SUPER_ADMIN_EMAIL=... SUPER_ADMIN_PASSWORD=... SUPER_ADMIN_NAME="Nashif Mulo" \
 *     npx tsx scripts/seed.ts
 *
 * Idempotent: safe to re-run. Never overwrites an existing user's password.
 * Password comes from env — deliberately NOT hardcoded and NOT committed.
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = process.env.SUPER_ADMIN_PASSWORD;
  const name = process.env.SUPER_ADMIN_NAME || "Super Admin";

  if (!email || !password) {
    throw new Error(
      "Set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD env vars before seeding."
    );
  }
  if (password.length < 12) {
    throw new Error(
      "SUPER_ADMIN_PASSWORD must be at least 12 characters — this account controls every school."
    );
  }

  const school = await prisma.school.upsert({
    where: { slug: "makindye" },
    update: {},
    create: {
      name: "Makindye Secondary School",
      slug: "makindye",
      address: "Makindye, Kampala, Uganda",
    },
  });
  console.log(`School ready: ${school.name} (${school.id})`);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Super admin already exists (${email}) — leaving untouched.`);
  } else {
    const passwordHash = await bcrypt.hash(password, 12);
    const admin = await prisma.user.create({
      data: { email, passwordHash, name, role: "SUPER_ADMIN", schoolId: null },
    });
    console.log(`Super admin created: ${admin.email} (${admin.id})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
