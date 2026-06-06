# Architecture Overview

## Stack

- **Framework**: Next.js 16 (App Router)
- **UI / 3D**: Reactylon 3.5 wrapping Babylon.js 9
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS with arbitrary values + CSS custom properties
- **Build**: Turbopack (dev), Next.js built-in (prod)

## Entry point

`src/app/page.tsx` → `<Engine>` → `<Scene>` → `<Content />`

The `Content` component is where app-specific 3D and 2D content lives.

## Data flow

```
page.tsx
  └─ Engine (reactylon/web) — creates Babylon.js engine
      └─ Scene (reactylon) — creates Babylon.js scene
          └─ Content — application components, both 3D and HTML
```

## Key constraints

- All Reactylon components require `'use client'` directive (browser APIs)
- `babel.config.js` with `babel-plugin-reactylon` is required for JSX transform
- No special Next.js config needed for basic setup
