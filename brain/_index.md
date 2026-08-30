# Innovation Club — Project Brain

> **Project:** `innovationclub` — Multi-school registration & dashboard platform
> **URL:** [https://innovate.alfinega.com](https://innovate.alfinega.com)
> **Stack:** Next.js 16 + Prisma 7 + Auth.js v5 + Neon Postgres, deployed on Vercel
> **Git:** `alffy` branch (default)
> **License:** MIT (2026 Alffy / Alfinega)

> ⚠️ This file was stale — it described the old Express/EJS stack, wiped
> 2026-07-04 per `brain/changelog/2026-07-04-rewrite.md`. Updated 2026-08-30.
> `brain/foundation/stack.md` already had the correct Next.js stack; this
> index just hadn't caught up. If other brain files still reference `.ejs`,
> `app.js`, or `db.js`, treat them as historical/superseded, not current.

---

## Map of Content

### Foundation
- [[foundation/stack]] — Verified Next.js/Prisma/Auth.js stack + versions
- [[foundation/configuration]]
- [[foundation/design]] — Colors, typography, design tokens
- [[foundation/infrastructure]] — Neon DB, Vercel hosting
- [[foundation/env]] — Environment variables reference

### Routes
- [[routes/map]]

### Views
- [[views/overview]] — ⚠️ Likely still describes old EJS templates; needs a
  pass to cover `src/app/**` (App Router) instead.

### Data
- [[data/overview]]

### Database
- [[database/schema]] — ⚠️ Check against `prisma/schema.prisma` for drift;
  not verified in this pass.

### Business
- [[business/program]]

### Platform
- [[platform/feature-map]]

### Analysis
- [[analysis/current-state-audit]] — Dated 2026-06-24, pre-rewrite. Several
  findings (e.g. #5, hardcoded school) still applied post-rewrite and were
  acted on in [[changelog/2026-08-30-register-school-field]]. Treat this
  audit as historical evidence, not a current-state document — it predates
  the Next.js rewrite.

### History
- [[changelog/_index]]

### Projects
- [[projects/zayed-sustainability-prize]]

---

## Quick Links (current, App Router)

| Area | Key File(s) |
|---|---|
| Entry point | `src/app/layout.tsx` |
| Prisma client | `src/lib/prisma.ts` |
| DB schema | `prisma/schema.prisma` |
| Auth | `src/lib/auth.ts` |
| Route gate | `src/proxy.ts` |
| Homepage | `src/app/page.tsx` |
| Registration form | `src/app/register/page.tsx` + `RegisterForm.tsx` |
| Registration server action | `src/app/register/actions.ts` |
| Success page | `src/app/register/success/page.tsx` |
| Dashboards | `src/app/dashboard/**` |
| Admin school management | `src/app/dashboard/admin/schools/**` |

---

## Known brain drift (unresolved)
- `views/overview.md`, `database/schema.md`, `routes/map.md`, `data/overview.md`
  were not re-verified against the current Next.js codebase in this pass —
  only the register-form fix was brain-logged. Flag for a full brain audit
  next time significant work touches those areas.
