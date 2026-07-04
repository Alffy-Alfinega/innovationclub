/**
 * One-time legacy-DB bootstrap, gated by a Vercel environment variable —
 * NOT a public endpoint. Runs inside the build, using the DATABASE_URL
 * Vercel already has. No new secret, no CLI, no browser-triggerable URL.
 *
 * To run it once: in Vercel's dashboard (any browser, no PC/CLI needed) —
 * Settings → Environment Variables → add RUN_LEGACY_BASELINE = yes-run-once
 * → redeploy. Then DELETE that variable so it never runs again.
 *
 * Idempotent and safe to accidentally leave on or re-trigger: checks
 * real database state before doing anything, not just an env var flag.
 */
const { Client } = require("pg");
const { execSync } = require("child_process");

async function main() {
  if (process.env.RUN_LEGACY_BASELINE !== "yes-run-once") {
    console.log("[baseline] RUN_LEGACY_BASELINE not set — skipping (normal for every deploy).");
    return;
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  // Idempotency guard: check real state, not just the env var.
  const already = await client
    .query(
      `SELECT 1 FROM _prisma_migrations WHERE migration_name = '20260703000000_baseline_legacy_db' AND finished_at IS NOT NULL`
    )
    .catch(() => ({ rowCount: 0 })); // table won't exist on first-ever run — that's fine, means "not done yet"

  if (already.rowCount > 0) {
    console.log("[baseline] Already applied previously — skipping. Safe to remove RUN_LEGACY_BASELINE now.");
    await client.end();
    return;
  }

  console.log("[baseline] Renaming legacy students table (if present)...");
  await client.query(`ALTER TABLE IF EXISTS students RENAME TO students_legacy;`);
  await client
    .query(`ALTER TABLE IF EXISTS students_legacy RENAME CONSTRAINT students_pkey TO students_legacy_pkey;`)
    .catch((e) => console.log("[baseline] PK rename skipped (already renamed or never existed):", e.message));

  await client.end();

  console.log("[baseline] Marking baseline migration resolved...");
  execSync("npx prisma migrate resolve --applied 20260703000000_baseline_legacy_db", { stdio: "inherit" });

  console.log("[baseline] Done. REMOVE RUN_LEGACY_BASELINE from Vercel env vars now — job complete.");
}

main().catch((err) => {
  console.error("[baseline] Failed:", err);
  process.exit(1);
});
