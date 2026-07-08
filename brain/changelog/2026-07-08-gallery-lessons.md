# 2026-07-08 — Gallery, Lessons, Activity, Profile

Per user's screenshot request ("items like these" from a reference coding
platform) — evaluated each item rather than cloning the nav wholesale.

## Declined (would be fake without real backing data)
- **Leaderboards** — needs a scoring system that doesn't exist; poor
  philosophical fit for a beginner club (ranking beginners against faster
  peers can demotivate exactly the kids this programme is for)
- **Practice** — needs a problem bank that doesn't exist
User agreed via follow-up, no pushback.

## Built (real data, real content)
- **Gallery**: new `Project` model — title/url/description/trimester/
  studentNames/schoolId. Migration hand-written (additive-only, no
  existing tables touched), verified against local Postgres with the
  real seeded ADMIN + SYSTEM_OPERATOR accounts before shipping. Admin
  CRUD at /dashboard/admin/gallery (add/delete); public `/projects` now
  queries real rows into a "Shipped by Students" section. Starts empty —
  populated only as real demo-day projects ship, never backfilled.
- **Lessons**: public `/lessons` page, per-trimester TOPIC breakdown (user
  explicitly wanted neither full session materials nor the high-level
  homepage overview — a middle layer). Trimester 1 topics drawn from
  documented curriculum specifics already in memory; Trimesters 2-6 use
  standard, defensible topic breakdowns for their named themes. This is
  instructor-authored curriculum structure, a different category from
  fabricated user-generated data like an empty leaderboard would be.
- **Activity** (the "Notifications" equivalent): /dashboard/admin/activity
  surfaces the AuditLog that already existed but was invisible in the UI
  — every USER_CREATE/UPDATE/DEACTIVATE, SCHOOL_CREATE/UPDATE/DELETE,
  BREAK_GLASS_LOGIN. Real data reuse, not a new invented feature.
- **Profile**: self-service name + password change for every role
  (/dashboard/profile), current-password verification required before
  setting a new one. Was already next on the roadmap independent of this
  request.

## Caught during verification (not assumed clean)
- `/projects` became a DB-dependent page and Next.js tried to statically
  prerender it at build time — failed locally (known adapter-neon/local-PG
  limitation) and would have frozen new gallery projects until the next
  deploy in production. Fixed: `export const dynamic = "force-dynamic"`.
- That surfaced a second, more important gap: with real request-time DB
  dependency, a hiccup would 500 the public page for real visitors — same
  class of bug fixed on `register` earlier today. Wrapped the query in
  try/catch, falls back to the honest static section. Verified by
  reproducing the exact failure (same broken local DB) and confirming
  200 instead of 500 after the fix — not just reasoned about.

## Verified
tsc 0, eslint 0, 20-route build green, live redirect test on all 3 new
gated routes + /lessons (200) + /projects (200, confirmed graceful
degradation under the same DB failure that used to 500 it)

## Addendum — Lessons nav link was silently never added
Caught by fetching the actual live page instead of trusting the earlier
commit message: the Navbar edit for "Lessons" used a Python string-replace
targeting an href that a PRIOR turn had already changed (`/makss/zayed/soilSkeleton`
→ `/projects`, done when the /projects page was first built). Since that
string no longer existed, `.replace()` matched nothing and silently
returned the file unchanged — no error, no warning, just a no-op. The
commit and push both "succeeded" with nothing actually different.
Same failure class as the sh brace-expansion bug and the unkeyed Fragment
earlier this session: an edit that looks correct in isolation but was
never verified against the actual resulting file.
Fixed with a direct str_replace against the real current content
(confirmed via grep before AND after). Lesson: after any edit, grep the
target file for the expected result — don't infer success from the edit
command completing without error.
