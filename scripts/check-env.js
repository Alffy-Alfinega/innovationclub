/**
 * Fails the BUILD, loudly and immediately, if required env vars are
 * missing or obviously placeholder — rather than letting a misconfigured
 * deploy go live and silently break auth for real users.
 *
 * This exists because of a real incident: AUTH_SECRET was missing from
 * Vercel's Production environment scope (added, but likely without the
 * "Production" checkbox ticked), and the failure mode was NOT an error
 * page — it was "login succeeds, then every protected page bounces back
 * to /login," which looks like an application bug and cost real
 * debugging time to trace to an environment variable.
 */
require("dotenv").config();

const required = ["DATABASE_URL", "DIRECT_DATABASE_URL", "AUTH_SECRET"];
const missing = required.filter((key) => !process.env[key] || process.env[key].trim().length === 0);

if (missing.length > 0) {
  console.error("\n" + "=".repeat(60));
  console.error("BUILD FAILED — missing required environment variable(s):");
  missing.forEach((key) => console.error(`  - ${key}`));
  console.error("");
  console.error("Fix: Vercel dashboard → Settings → Environment Variables");
  console.error("     → confirm each variable above exists AND has the");
  console.error("     'Production' checkbox ticked (not just Preview/Dev).");
  console.error("     Env vars are scoped per-environment on Vercel — a");
  console.error("     var added without Production checked is invisible");
  console.error("     to real users, but may still work in Preview,");
  console.error("     which is why this can look like it 'works sometimes.'");
  console.error("=".repeat(60) + "\n");
  process.exit(1);
}

if (process.env.AUTH_SECRET.length < 32) {
  console.error("\nBUILD FAILED — AUTH_SECRET is set but suspiciously short");
  console.error("(< 32 chars). Generate a real one: npx auth secret\n");
  process.exit(1);
}

console.log("[check-env] All required environment variables present.");
