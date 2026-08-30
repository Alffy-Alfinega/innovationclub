# 2026-08-30 — Fix: prisma migrate deploy timing out (P1002)

## Symptom
Production build failed at `prisma migrate deploy`:
```
Error: P1002
The database server was reached but timed out.
Context: Timed out trying to acquire a postgres advisory lock
(SELECT pg_advisory_lock(72707369)). Timeout: 10000ms.
```
Triggered on a trivial commit (terms-page consent text) — not caused by
that change. Site stayed up throughout; Vercel kept serving the prior
successful deployment (the register-form fix) while this one failed to
build.

## Root cause
`prisma.config.ts` only had one datasource URL, `DATABASE_URL`, which per
`brain/foundation/env.md` is Neon's **pooled** (PgBouncer, transaction-mode)
endpoint. That's correct for the app runtime (`@prisma/adapter-neon` in
`src/lib/prisma.ts`), but `prisma migrate deploy` needs a session-scoped
connection to hold its advisory lock — a transaction-mode pooler doesn't
preserve session state across statements, so the lock acquisition can stall
or never resolve. This is a documented Prisma+Neon/PgBouncer gotcha, not
something visible from the schema or app code.

## Fix
- `prisma.config.ts`: added `directUrl: process.env["DIRECT_DATABASE_URL"]`
  alongside the existing pooled `url`. Migrations now route through the
  direct connection; the runtime client is untouched (still pooled, still
  correct for serverless).
- `scripts/check-env.js`: `DIRECT_DATABASE_URL` added to the required-vars
  list, so a missing value fails the build loudly at the check-env step
  instead of failing 10+ seconds into `migrate deploy` with a cryptic
  advisory-lock error.
- `brain/foundation/env.md` updated with both vars and the why.

## Action required — cannot be done remotely
**Nashif must add `DIRECT_DATABASE_URL` in Vercel → Settings → Environment
Variables, scoped to Production (and Preview if used).** No tool available
to me exposes Vercel env var configuration — same limitation noted in the
AUTH_SECRET incident (`brain/changelog` from the July rewrite). Value is
Neon's unpooled connection string (no `-pooler` in the hostname) — check
whether the Vercel-Neon integration already injected one as
`DATABASE_URL_UNPOOLED` before manually pulling it from Neon's dashboard.

Until that var is set in Vercel, this exact build will fail the same way
again on the next deploy — the code fix alone is not sufficient.

## Correction (same day)
First push of this fix used `datasource: { url: DATABASE_URL, directUrl: DIRECT_DATABASE_URL }`. That failed the *next* build with a real type error:
```
Object literal may only specify known properties, and 'directUrl' does not
exist in type '{ url?: string; shadowDatabaseUrl?: string }'.
```
`directUrl` isn't a valid field in Prisma 7.8.0's `prisma.config.ts` datasource type — that pattern applies to the classic `schema.prisma` `datasource` block in older Prisma versions, not this project's `prisma.config.ts` setup. Caught by the build's own type-checker, not assumed correct from docs.

Corrected fix: since `prisma.config.ts`'s `datasource.url` is CLI-only in Prisma 7 (the runtime app never reads it — `src/lib/prisma.ts` gets its connection independently via `@prisma/adapter-neon`, pointed at `DATABASE_URL`), there's nothing to split. `prisma.config.ts` now sets its single `url` directly to `DIRECT_DATABASE_URL`. Verified with `tsc --noEmit` before pushing this time.
