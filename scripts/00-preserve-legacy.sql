-- STEP 0 — run this ONCE against the Neon DB BEFORE `prisma migrate deploy`
-- (or the bootstrap sequence below) touches it.
--
-- The old Express app created a `students` table with a different shape,
-- and Postgres does NOT rename a table's underlying constraints/indexes
-- when you rename the table itself — its primary key constraint stays
-- named `students_pkey` even after the table becomes `students_legacy`.
-- Confirmed by reproducing this exact collision locally: without the
-- second line below, the new schema's own `students` table fails to
-- create with "relation students_pkey already exists".
--
--   psql "$DATABASE_URL" -f scripts/00-preserve-legacy.sql
--
ALTER TABLE IF EXISTS students RENAME TO students_legacy;
ALTER TABLE IF EXISTS students_legacy RENAME CONSTRAINT students_pkey TO students_legacy_pkey;
