-- STEP 0 — run this ONCE against the Neon DB BEFORE `prisma migrate dev`.
-- The old Express app created a `students` table with a different shape.
-- Prisma's migration will want to create its own `students` table and will
-- collide with (or worse, be tempted to reset) the existing one.
-- This renames the legacy table out of the way, preserving every row.
--
--   psql "$DATABASE_URL" -f scripts/00-preserve-legacy.sql
--
ALTER TABLE IF EXISTS students RENAME TO students_legacy;
