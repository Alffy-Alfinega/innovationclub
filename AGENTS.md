# innovationclub — AGENTS.md

Next.js 16 + Reactylon 3.5 + Babylon.js 9 + TypeScript 5 — App Router.

## Commands

```bash
npm run dev      # dev server (Turbopack) at localhost:3000
npm run build    # production build
npm run start    # start production server
npm run lint     # ESLint 9 (flat config, eslint.config.mjs)
```

## Project structure

```
src/
├── app/
│   ├── globals.css       # Global styles + CSS custom properties + keyframes
│   ├── layout.tsx        # Root layout (Syne/Outfit/JetBrains Mono, Nav, Footer)
│   ├── page.tsx          # Home — <Engine>/<Scene> entrypoint (reactylon/web)
│   ├── Content.tsx       # Home page sections (hero, programs, process, testimonials, CTA)
│   ├── about/page.tsx    # About page (stats, story, team)
│   ├── events/page.tsx   # Events page (upcoming events list)
│   ├── join/page.tsx     # Join page (benefits + application form)
│   └── programs/page.tsx # Programs page (program grid)
├── components/
│   ├── home/
│   │   ├── Hero3D.tsx             # 3D torus knot scene with Babylon.js
│   │   ├── StatsMarquee.tsx       # Horizontal scrolling stats strip
│   │   └── TestimonialCarousel.tsx # Marquee-style testimonial cards
│   ├── layout/
│   │   ├── Nav.tsx                # Fixed nav (desktop + mobile)
│   │   └── Footer.tsx             # Multi-column footer
│   └── ui/
│       ├── Badge.tsx              # Blue/Gold pill badge
│       ├── Button.tsx             # Link button (primary/secondary/ghost)
│       ├── Card.tsx               # Card (default/blue/gold variants)
│       └── SectionHeading.tsx     # Reusable section heading with tag + title + highlight
brain/           # Obsidian-style project knowledge base (see brain/_index.md)
public/          # Static assets
.env             # Neon/Postgres database credentials (Vercel Postgres format)
babel.config.js  # Required for Reactylon — uses babel-plugin-reactylon
eslint.config.mjs # ESLint 9 flat config (core-web-vitals + typescript)
next.config.ts   # Bare — add image domains, webpack overrides here
postcss.config.js # @tailwindcss/postcss + Autoprefixer
tailwind.config.js # Retained for reference (v4 config lives in globals.css @theme)
tsconfig.json    # strict: true, @/* → ./src/*
```

## Style conventions (matching alffy.alfinega.com)

- Tailwind CSS with arbitrary values (`text-[#...]`, `bg-[#...]`)
- Design tokens via CSS custom properties:
  - `--bg: #04040C`, `--surface: #0A0A1A`, `--border: #1C1C34`
  - `--text: #FFFFFF`, `--text-muted: #9A9ABB`, `--text-dimmer: #8A8AAA`, `--text-faint: #666666`
  - `--primary: #2C6FED` (electric blue), `--primary-dark: #1A52C4`, `--secondary: #D4A843` (gold)
- Fonts: **Syne** (headings, 700-800), **Outfit** (body, 300-600), **JetBrains Mono** (labels/tech)
- Container: `max-w-[1440px] mx-auto`, sections `py-20 md:py-32 px-6 md:px-16`
- Buttons: `rounded-full` pill shape, solid blue gradient (`#2C6FED` → `#1A52C4`) or outline
- Cards: `rounded-2xl p-7 border border-[#1C1C34]` with `bg-[#0A0A1A]`
- Animations: staggered fade-up (`cubic-bezier(0.16,1,0.3,1)`), 40s marquee, fadeLeft, float, pulseGlow
- Nav: fixed `h-[68px]` with `bg-[#04040C]/80 backdrop-blur-md border-b border-[#1C1C34]`
- Footer: multi-column grid (Programs, Company, Connect) + copyright

## Reactylon quirks

- Components must be `'use client'` (Reactylon uses browser APIs)
- Requires `babel-plugin-reactylon` in `babel.config.js` — do not remove
- `<Engine>` at root → `<Scene onSceneReady={...}>` → your 3D content
- `scene.createDefaultCameraOrLight(true, undefined, true)` sets up basic scene
- Babylon.js meshes/lights declared as JSX children inside `<Scene>`
