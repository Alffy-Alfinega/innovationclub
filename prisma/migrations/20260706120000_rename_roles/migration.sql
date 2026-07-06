-- Rename Role enum values to match real domain terminology, and rename
-- the parent_students join table to student_links (role PARENT -> STUDENT
-- changes who holds the account: the student themselves, not a guardian).
--
-- Using ALTER TYPE ... RENAME VALUE (not drop/recreate): this updates
-- every EXISTING row referencing these values atomically — no data
-- migration needed, no risk of orphaning the SYSTEM_OPERATOR account
-- already live in production (Mr. Waira George, created as SCHOOL_ADMIN
-- via the CRUD shipped earlier today).

ALTER TYPE "Role" RENAME VALUE 'SUPER_ADMIN' TO 'ADMIN';
ALTER TYPE "Role" RENAME VALUE 'SCHOOL_ADMIN' TO 'SYSTEM_OPERATOR';
ALTER TYPE "Role" RENAME VALUE 'MENTOR' TO 'PATRON';
ALTER TYPE "Role" RENAME VALUE 'PARENT' TO 'STUDENT';

-- Table + column rename (data-preserving, not drop/recreate)
ALTER TABLE "parent_students" RENAME TO "student_links";
ALTER TABLE "student_links" RENAME COLUMN "parentId" TO "userId";
-- Postgres auto-names the FK/unique constraints after the old table name;
-- rename them too so future introspection doesn't show a "parent_students"
-- artifact hiding inside a table called "student_links".
ALTER TABLE "student_links" RENAME CONSTRAINT "parent_students_pkey" TO "student_links_pkey";
ALTER TABLE "student_links" RENAME CONSTRAINT "parent_students_parentId_fkey" TO "student_links_userId_fkey";
ALTER TABLE "student_links" RENAME CONSTRAINT "parent_students_studentId_fkey" TO "student_links_studentId_fkey";
ALTER INDEX "parent_students_parentId_studentId_key" RENAME TO "student_links_userId_studentId_key";
