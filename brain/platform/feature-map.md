# Platform Feature Map — complete inventory (2026-07-06)

> Compiled from the full platform-build conversation + project memory.
> Other chats in this project are curriculum/teaching work (verified via
> search 2026-07-06) — all platform decisions trace to the rewrite thread.

## Marketing site (public)
- `/` — parent-brand home: 3D Babylon hero (lazy, Data-Saver/2g fallback),
  ✦ marquee, 6-trimester programme grid, why-section, transparent fees
  (UGX 50K/yr + 150K/trimester + variance clause), Zayed spotlight, CTA
- `/projects` — flagship Zayed card + honest "ships at demo days" slots
- `/makss/zayed/soilSkeleton` — **URL CONTRACT** (in the official Zayed
  Prize application; never move)
- `/register` — full field set (first/middle/last/other name, gender,
  class→dependent stream, status, term, read-only school, contact, clubs,
  terms link), Server Action (structural CSRF), DB-failure-resilient
- `/terms`, `/login`, site-wide error.tsx + global-error.tsx

## Platform (authenticated)
- Auth.js v5 credentials; JWT carries id/role/schoolId; trustHost;
  explicit secret; break-glass logins auto-audited
- `src/proxy.ts` — single gate: role check + school scoping for all
  /dashboard/*; exact-match `/dashboard` (auth-bypass fix); denied pass-through
- `/dashboard` — role router (SUPER_ADMIN→super, etc.)
- Sidebar shell — desktop rail + mobile drawer, active-route highlight,
  per-destination icons, role avatar, back-to-site, sign-out
- **Super**: stats (schools/students/staff), school table, add-school
  (audited), *(2026-07-06: + full school & user CRUD — see below)*
- **School**: stats (total/day/boarding/club), searchable StudentTable,
  empty state with register URL
- **Mentor**: club stats, Innovation(blue)/AI(gold) badges
- **Parent**: child cards w/ initials avatar via ParentStudent links
- **Denied**: friendly no-access page

## Build pipeline (every deploy)
check-env (fail-fast on missing DATABASE_URL/AUTH_SECRET) → prisma
generate → maybe-baseline (env-gated, idempotent) → migrate deploy →
maybe-seed (env-gated, non-fatal) → next build

## CRUD design decisions (2026-07-06, SUPER_ADMIN first)
- **Users**: create/read/update + deactivate/reactivate. NO hard delete —
  AuditLog FKs to User; deleting a user would orphan or destroy the audit
  trail that break-glass accountability depends on. Deactivate = login
  blocked (authorize() already checks isActive).
- **Lockout rails**: cannot deactivate yourself; cannot deactivate or
  demote the LAST active SUPER_ADMIN (platform lockout = unrecoverable
  without DB surgery, which the user cannot do — no PC).
- **schoolId rule from schema**: null only for SUPER_ADMIN/BREAK_GLASS;
  required for SCHOOL_ADMIN/MENTOR/PARENT. Enforced in actions.
- **Schools**: update name/address only — **slug immutable** (register
  action resolves school by slug "makindye"; tenant references depend on
  it). Delete blocked while school has students or users — no cascade
  wipe of minors' records behind one button.
- All mutations audit-logged: USER_CREATE/UPDATE/DEACTIVATE/REACTIVATE,
  SCHOOL_UPDATE/DELETE (passwords never in audit detail).
- In-action role checks on every mutation (defense in depth, per the
  established add-school pattern).

## Known deferred (deliberate)
- School-admin-scoped CRUD (next after super)
- Self-service password change / forced reset on first login
- Parent↔student linking UI (schema ready via ParentStudent)
- Mentor/parent write features; email confirmation on registration

## Gallery + Lessons (added 2026-07-08, per user decisions)
- **Gallery**: real `Project` model (title, url, description?, trimester,
  studentNames free-text, schoolId, createdByUserId). Starts EMPTY —
  populated as real demo-day projects ship, not backfilled with fakes.
  Admin CRUD first (consistent with "start with superuser" precedent from
  the earlier user/school CRUD work); Patron/Operator school-scoped access
  is the natural next step, not built this round.
  Public `/projects` page now queries real Project rows into the "what
  ships next" section — replaces the static honest-placeholder with
  actual growing content over time, while keeping an honest empty state
  if a school has shipped nothing yet.
- **Lessons**: per-trimester TOPIC breakdown (user explicitly said NOT
  full session materials, NOT just the high-level 6-line overview
  already on the homepage — a middle layer). Trimester 1 topics drawn
  from documented curriculum specifics already in memory (CPU/RAM
  reframes, Excel IF/charts, file-path-as-repo-discipline, etc.);
  Trimesters 2-6 use standard, defensible topic breakdowns for their
  already-named themes (e.g. "Web Foundations" → HTML/CSS/responsive/
  Git/GitHub Pages) since this is instructor-authored curriculum
  structure, not fabricated user data — different category from an
  empty leaderboard. Built as a public page `/lessons` (curriculum
  content isn't sensitive) linked from nav + homepage + dashboard
  sidebar, not duplicated per-role.
- **Explicitly declined**: Leaderboards, Practice (competitive-coding-
  platform features with no scoring system or problem bank behind them,
  and a poor philosophical fit for a beginner-focused club) — will build
  if a real scoring source is defined.
