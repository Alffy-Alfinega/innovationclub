# Stack — Next.js Rewrite (v2 platform)

> Supersedes the Express/EJS stack. Wiped 2026-07-04 on Nashif's instruction,
> preserving only `.git` and `brain/`.

## Verified versions (all latest as of 2026-07-04, build-tested)

| Package | Version | Notes |
|---|---|---|
| next | 16.2.10 | Turbopack default; `proxy.ts` replaces `middleware.ts` |
| react / react-dom | 19.2.7 | |
| typescript | 6.0.3 | |
| tailwindcss | 4.3.2 | v4 PostCSS pipeline |
| prisma / @prisma/client | 7.8.0 | **Breaking**: requires driver adapter, no `url` in schema |
| @prisma/adapter-neon | 7.8.0 | Matches our Neon Postgres |
| next-auth | 5.0.0-beta.31 | v5 beta is the App Router line; npm's "latest" tag (4.x) is the OLD line — do not "upgrade" to it |
| @babylonjs/core / loaders | 9.15.0 | |
| react-babylonjs | latest | animation via `useBeforeRender` hook + mesh ref, NOT an `onBeforeRender` JSX prop |
| bcryptjs | 3.0.3 | |
| eslint | ^9 (pinned) | **Deliberate**: eslint 10 crashes eslint-config-next 16.2.10's bundled react plugin. 9.x is the newest compatible. Revisit when eslint-config-next supports 10. |

## Gotchas encountered & solved (do not rediscover these)
1. **Prisma 7**: `datasource.url` moved out of schema.prisma into prisma.config.ts;
   runtime client REQUIRES `new PrismaClient({ adapter })`. Without it, build fails
   at page-data collection with PrismaClientInitializationError.
2. **Next 16**: `middleware.ts` deprecated → renamed to `src/proxy.ts`. Same logic,
   default export unchanged. Runs on Node runtime (good — our auth chain imports Prisma).
3. **react-babylonjs**: no `onBeforeRender` prop on mesh JSX elements. Use the
   `useBeforeRender(scene => ...)` hook with a `useRef<Mesh>` inside a child component.
4. **React 19 lint**: `setState` directly inside `useEffect` is now a lint error
   (react-hooks/set-state-in-effect). For external browser APIs (e.g.
   `navigator.connection`), use `useSyncExternalStore` — see MarketingHero.tsx.
5. **`next lint` removed in v16** — run `npx eslint src` directly.

## Architecture decisions
- **3D boundary**: Babylon lives ONLY in `src/components/3d/`, dynamically imported
  with `ssr:false`. Never imported by /dashboard routes. MarketingHero disables 3D
  on Data-Saver / 2g connections (real user base: students on low-end Android).
- **Tenancy**: `School` is the tenant. All users/students scope by `schoolId`;
  only SUPER_ADMIN and BREAK_GLASS are unscoped.
- **Break-glass**: modeled in schema + audited on every login (AuditLog:
  BREAK_GLASS_LOGIN). Full hardening deferred — see 2026-07-04 discussion:
  building emergency access for a platform with zero live accounts is premature.
- **CSRF**: Server Actions are origin-checked by Next.js structurally — no manual
  token system like the Express app needed.
