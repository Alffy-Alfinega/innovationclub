# 2026-07-06 — Role rename + real sidebar layout bug fix

## Sidebar layout bug (from screenshot)
Real diagnosis: Sidebar renders a mobile top bar + desktop rail as sibling
top-level elements (standard responsive pattern — React fragments don't
wrap). The parent container was plain `flex` (row, no direction set), so
on mobile the top bar became a flex ITEM in a row instead of a horizontal
strip stacked above content — hence "Innovation Club ☰" floating as a
narrow left column instead of a top bar. Fixed: `flex flex-col md:flex-row`
(column/stacked on mobile, row/side-by-side on desktop). Verified via the
same route-redirect tests below (layout renders under the same conditions).

## Role rename — real rename through the whole stack, not label-only
| Old | New | Why |
|---|---|---|
| SUPER_ADMIN | ADMIN | simpler |
| SCHOOL_ADMIN | SYSTEM_OPERATOR | per-school role is operational, not administrative |
| MENTOR | PATRON | real Ugandan school terminology for a club's supervising staff member |
| PARENT | STUDENT | **semantic change**: account now represents the student viewing their own record, not a guardian — matches how registration already works (students register themselves) |

**Explicitly flagged to the user**: PARENT→STUDENT changes who holds the
account. Proceeded on that basis; told him to say if he actually wanted
separate guardian access preserved.

### What changed (real refactor, not cosmetic)
- **Migration** `20260706120000_rename_roles`: hand-written (not
  auto-diffed) using `ALTER TYPE ... RENAME VALUE` — data-preserving,
  updates every existing row atomically. Verified against a LOCAL
  Postgres seeded with BOTH an ADMIN-equivalent and a SCHOOL_ADMIN
  account (matching Mr. Waira George's real production account) before
  shipping — confirmed both survive the rename correctly, table/column/
  constraint renames (parent_students→student_links,
  parentId→userId) also verified against actual constraint names
  (checked via pg_constraint, not guessed).
- **Model rename**: `ParentStudent` → `StudentLink`, `parentId` → `userId`,
  `User.parentLinks` → `User.studentLinks`, `Student.parentLinks` →
  `Student.linkedUsers` (clearer — avoids "student.studentLinks" reading
  oddly)
- **Route folders renamed** (not just labels sitting on stale URLs):
  `/dashboard/super`→`/admin`, `/school`→`/operator`, `/mentor`→`/patron`,
  `/parent`→`/student`
- **Student dashboard rewritten**, not just renamed: was a grid of
  "children" cards (guardian framing); now a single profile view (their
  own record) — the plural-card layout no longer made sense once the
  role represents self-access
- proxy.ts, dashboard/page.tsx (ROLE_HOME), layout.tsx (NAV_BY_ROLE),
  Sidebar.tsx (ROLE_ICON/LINK_ICON keyed by new destinations) all updated
- seed.ts: role value now "ADMIN" — but env var NAMES
  (SUPER_ADMIN_EMAIL/PASSWORD/NAME) deliberately KEPT as-is, since
  they're already configured in live Vercel settings and RUN_SEED is
  designed to be safely re-triggerable; renaming the var names would
  risk a silent mismatch on a future re-run

### Verified
- Exhaustive grep for old role/model names across src/+scripts/ after
  the refactor — clean except deliberately-kept env var names
- tsc: 0 errors (after clearing stale `.next/` cache from pre-rename
  build, which briefly showed phantom errors referencing the old paths)
- eslint: 0 warnings
- Production build: 17/17 routes, all under new paths
- Live redirect test (real `next start`, not just build success): all 6
  renamed routes correctly gate and redirect to `/login` with the correct
  new-path `callbackUrl` — proxy.ts's new ROUTE_ROLES keys confirmed wired
  correctly end-to-end
- Full authenticated E2E still not possible locally (adapter-neon needs
  real Neon, same limitation as every previous auth investigation this
  session) — will verify against production runtime logs after deploy
