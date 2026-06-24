-- ============================================================
-- Innovation Club — Database Schema
-- Neon PostgreSQL (pg 16)
-- ============================================================
-- Usage:
--   psql $DATABASE_URL -f sql/schema.sql
--
-- This file is safe to run on an existing database:
--   - Creates the table only if it does not exist
--   - Adds missing columns (date_of_birth, section) if absent
--     so it can repair a database created by the old db.js
-- ============================================================

-- ── CREATE TABLE ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS students (
  student_id      UUID          PRIMARY KEY,
  first_name      VARCHAR(255)  NOT NULL,
  middle_name     VARCHAR(255),
  last_name       VARCHAR(255)  NOT NULL,
  other_name      VARCHAR(255),
  gender          VARCHAR(20),
  date_of_birth   DATE,
  class           VARCHAR(50)   NOT NULL,
  stream          VARCHAR(50),
  section         VARCHAR(50),
  term_joined     VARCHAR(50),
  school_name     VARCHAR(255),
  email           VARCHAR(255),
  phone           VARCHAR(50),
  innovation_club BOOLEAN       DEFAULT FALSE,
  ai_club         BOOLEAN       DEFAULT FALSE,
  iscc            BOOLEAN       DEFAULT FALSE,
  student_status  VARCHAR(50),
  created_at      TIMESTAMP     DEFAULT NOW()
);

-- ── REPAIR MIGRATIONS ───────────────────────────────────────
-- Adds columns that were missing in the original db.js DDL.
-- ALTER COLUMN IF NOT EXISTS is not standard SQL — use DO block.

DO $$
BEGIN
  -- date_of_birth (was in brain spec but missing from db.js)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'students' AND column_name = 'date_of_birth'
  ) THEN
    ALTER TABLE students ADD COLUMN date_of_birth DATE;
    RAISE NOTICE 'Added missing column: date_of_birth';
  END IF;

  -- section (was in brain spec but missing from db.js)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'students' AND column_name = 'section'
  ) THEN
    ALTER TABLE students ADD COLUMN section VARCHAR(50);
    RAISE NOTICE 'Added missing column: section';
  END IF;
END
$$;

-- ── INDEXES ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_students_school_name  ON students (school_name);
CREATE INDEX IF NOT EXISTS idx_students_class        ON students (class);
CREATE INDEX IF NOT EXISTS idx_students_created_at   ON students (created_at DESC);

-- ── VERIFY ──────────────────────────────────────────────────
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'students'
ORDER BY ordinal_position;
