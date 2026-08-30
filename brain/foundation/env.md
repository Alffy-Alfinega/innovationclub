# Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string — **pooled** (`-pooler` in hostname). Used by the runtime app via `@prisma/adapter-neon` (`src/lib/prisma.ts`). |
| `DIRECT_DATABASE_URL` | Yes (added 2026-08-30) | Neon PostgreSQL connection string — **unpooled/direct** (no `-pooler` in hostname). This is the URL `prisma.config.ts` actually uses — it's CLI-only in Prisma 7 (`migrate deploy`, `migrate dev`, `studio`, etc.), never read by the running app. The app's runtime `PrismaClient` gets `DATABASE_URL` independently via `@prisma/adapter-neon` in `src/lib/prisma.ts`. |
| `AUTH_SECRET` | Yes | Auth.js session secret, must be ≥32 chars. |

Set in `.env` for local dev. Must be configured in the deployment dashboard for production, **with the Production checkbox ticked** — see `brain/changelog/2026-06-25*` for the incident where `AUTH_SECRET` existed but wasn't scoped to Production.

```env
DATABASE_URL=postgresql://neondb_owner:...@ep-xxxx-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require
DIRECT_DATABASE_URL=postgresql://neondb_owner:...@ep-xxxx.eu-west-2.aws.neon.tech/neondb?sslmode=require
```

## Why two DB URLs
Neon's pooled endpoint (PgBouncer, transaction mode) is correct — even required — for the serverless app runtime, but breaks `prisma migrate deploy`: migrations take a session-scoped Postgres advisory lock, and a transaction-mode pooler doesn't preserve a session across statements. This caused a production build failure on 2026-08-30 (`P1002`, "timed out trying to acquire a postgres advisory lock", 10s timeout).

**Fix, corrected version:** In Prisma 7, `prisma.config.ts`'s `datasource.url` is CLI-only — `migrate`, `generate`, `studio` — never read by the running app (the runtime `PrismaClient` gets its connection independently via `@prisma/adapter-neon` in `src/lib/prisma.ts`, pointed at `DATABASE_URL`). So the fix is simply pointing `prisma.config.ts`'s one `url` at the unpooled `DIRECT_DATABASE_URL`, not adding a second field.

First attempt tried `datasource.directUrl` (a two-URL split, one for CLI-migrate one for CLI-runtime-within-the-same-config) — that field doesn't exist on this type in Prisma 7.8.0 and failed the build's own type-check. Caught and corrected same day; see `brain/changelog/2026-08-30-migrate-advisory-lock-fix.md`.

**Getting the unpooled string:** Neon dashboard → your project → Connection Details → toggle off "Pooled connection" (or use the Vercel-Neon integration's auto-injected `DATABASE_URL_UNPOOLED` if that's already present in your Vercel env — check there before creating a new one manually, it may already exist).
