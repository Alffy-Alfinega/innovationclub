/**
 * Gated seed step — creates the first school + super admin, using
 * credentials YOU choose via Vercel env vars. Not invented or handed to
 * you in chat: a password that passes through a conversation transcript
 * is exposed the same way the GitHub PAT in this project's preferences
 * has been all session — this avoids repeating that mistake.
 *
 * To run it once (browser only, no CLI):
 * Vercel dashboard → Settings → Environment Variables → add:
 *   SUPER_ADMIN_EMAIL    = your real email
 *   SUPER_ADMIN_PASSWORD = a password you choose, 12+ characters
 *   SUPER_ADMIN_NAME     = your name (optional, defaults to "Super Admin")
 *   RUN_SEED              = yes-run-once
 * → redeploy → log in at /login with the email + password you set.
 *
 * Safe to leave RUN_SEED on afterward: scripts/seed.ts is itself
 * idempotent (upserts the school, skips if the admin email already
 * exists) — re-running it does nothing destructive.
 *
 * Deliberately NEVER fails the build: seeding is admin-bootstrap, not
 * schema migration. A bug here should be visible in the build log, not
 * capable of taking the entire site offline via the `&&` build chain —
 * that coupling was a real mistake, caught by testing this exact path
 * and watching it kill the whole build on a seed-side failure.
 */
const { execSync } = require("child_process");

function main() {
  if (process.env.RUN_SEED !== "yes-run-once") {
    console.log("[seed] RUN_SEED not set — skipping (normal for every deploy).");
    return;
  }
  if (!process.env.SUPER_ADMIN_EMAIL || !process.env.SUPER_ADMIN_PASSWORD) {
    console.log("[seed] RUN_SEED is set but SUPER_ADMIN_EMAIL/SUPER_ADMIN_PASSWORD are missing — skipping. Set both in Vercel env vars first.");
    return;
  }
  try {
    console.log("[seed] Running scripts/seed.ts...");
    execSync("npx tsx scripts/seed.ts", { stdio: "inherit" });
    console.log("[seed] Done. You can log in now. RUN_SEED is safe to leave or remove.");
  } catch (err) {
    console.error("[seed] FAILED — this does NOT block the site deploy, but your login was not created:", err.message);
    console.error("[seed] Check the error above, fix SUPER_ADMIN_EMAIL/PASSWORD if invalid, and redeploy.");
  }
}

main();
