# innovationclub — AGENTS.md

Next.js 16 + Reactylon 3.5 + Babylon.js 9 + TypeScript 5 — App Router.

## Commands

```bash
npm run dev      # dev server (Turbopack) at localhost:3000
npm run build    # production build
npm run start    # start production server
npm run lint     # ESLint 9 (eslint-config-next core-web-vitals + typescript)
```

## Key structure

- `src/app/page.tsx` — entry point: `<Engine>` / `<Scene>` wrapper from `reactylon/web`
- `babel.config.js` — **required** for Reactylon; uses `babel-plugin-reactylon`
- `next.config.ts` — bare; add image domains, webpack overrides here
- Fonts: Geist Sans / Geist Mono via `next/font` (Vercel default)

## Style conventions (matching alffy.alfinega.com)

- Tailwind CSS with arbitrary values (`text-[#...]`, `bg-[#...]`)
- Design tokens via CSS custom properties: `--bg` (`#04040C`), `--text`, `--text-muted`, `--border` (`#1C1C34`)
- Primary: `#2C6FED` (electric blue), secondary: `#D4A843` (gold)
- Fonts: **Syne** (headings, 700-800), **Outfit** (body, 300-600), **JetBrains Mono** (labels)
- Container: `max-w-[1440px] mx-auto`, sections `py-20 md:py-32 px-6 md:px-16`
- Buttons: `rounded-full` pill shape, solid blue gradient or outline
- Cards: `rounded-2xl p-7 border`
- Animations: staggered fade-up with `cubic-bezier(0.16,1,0.3,1)`, 40s marquee

## Reactylon quirks

- Components must be `'use client'` (Reactylon uses browser APIs)
- Requires `babel-plugin-reactylon` in `babel.config.js` — do not remove
- `<Engine>` at root → `<Scene onSceneReady={...}>` → your 3D content
- `scene.createDefaultCameraOrLight(true, undefined, true)` sets up basic scene
