# Next.js Configuration

## Version

Next.js 16 with Turbopack (dev server).

## App Router

All routes under `src/app/`:
- `layout.tsx` — root layout with fonts, metadata, html/body shell
- `page.tsx` — home page
- Additional routes: `src/app/<route>/page.tsx`

## next.config.ts

Currently bare — no custom config. Common additions:

```ts
// Allow external images
images: {
  remotePatterns: [{ protocol: 'https', hostname: '**.example.com' }]
}
```

## ESLint

Flat config (`eslint.config.mjs`) using:
- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`
- `react-hooks/immutability` rule disabled

## TypeScript

- `tsconfig.json` — strict mode, `@/*` path alias mapping to `./src/*`
- `next-env.d.ts` — Next.js TypeScript declarations (auto-generated)

## PostCSS

`postcss.config.js` uses Tailwind CSS + Autoprefixer plugins.

## Tailwind CSS

`tailwind.config.js`:
- Content paths: `./src/**/*.{js,ts,jsx,tsx}`
- Custom font families via CSS variables: `--font-syne`, `--font-outfit`, `--font-mono`
- No custom plugins or other extensions

## Environment

`.env` contains Neon (Postgres) database credentials in Vercel Postgres format. Includes:
- `DATABASE_URL` / `POSTGRES_URL` (pooled connection via PgBouncer)
- `DATABASE_URL_UNPOOLED` / `POSTGRES_URL_NON_POOLING` (direct connection)
- PostgreSQL parameters: `PGHOST`, `PGUSER`, `PGDATABASE`, `PGPASSWORD`
- All Vercel Postgres template variables (`POSTGRES_*`)
