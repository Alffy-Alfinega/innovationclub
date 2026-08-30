# Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string — **pooled** (`-pooler` in hostname). Used by the runtime app via `@prisma/adapter-neon` (`src/lib/prisma.ts`). |
| `DIRECT_DATABASE_URL` | Yes (added 2026-08-30) | Neon PostgreSQL connection string — **unpooled/direct** (no `-pooler` in hostname). Used only by `prisma migrate deploy` for its session-scoped advisory lock. |
| `AUTH_SECRET` | Yes | Auth.js session secret, must be ≥32 chars. |

Set in `.env` for local dev. Must be configured in the deployment dashboard for production, **with the Production checkbox ticked** — see `brain/changelog/2026-06-25*` for the incident where `AUTH_SECRET` existed but wasn't scoped to Production.

```env
DATABASE_URL=postgresql://neondb_owner:...@ep-xxxx-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require
DIRECT_DATABASE_URL=postgresql://neondb_owner:...@ep-xxxx.eu-west-2.aws.neon.tech/neondb?sslmode=require
```

## Why two DB URLs
Neon's pooled endpoint (PgBouncer, transaction mode) is correct — even required — for the serverless app runtime, but breaks `prisma migrate deploy`: migrations take a session-scoped Postgres advisory lock, and a transaction-mode pooler doesn't preserve a session across statements. This caused a production build failure on 2026-08-30 (`P1002`, "timed out trying to acquire a postgres advisory lock", 10s timeout). Fixed by adding `directUrl` in `prisma.config.ts`, pointed at the unpooled connection via `DIRECT_DATABASE_URL`. `check-env.js` now requires it at build time, same as `AUTH_SECRET`.

**Getting the unpooled string:** Neon dashboard → your project → Connection Details → toggle off "Pooled connection" (or use the Vercel-Neon integration's auto-injected `DATABASE_URL_UNPOOLED` if that's already present in your Vercel env — check there before creating a new one manually, it may already exist).
