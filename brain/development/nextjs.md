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
