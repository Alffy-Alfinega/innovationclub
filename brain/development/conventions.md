# Development Conventions

## Code style

- TypeScript strict mode enabled
- Use `'use client'` directive for any component using Reactylon or browser APIs
- Tailwind arbitrary values for one-off styling: `text-[#...]`, `bg-[#...]`
- Prefer CSS custom properties for repeated design tokens: `var(--bg)`, `var(--text)`, `var(--border)`

## File organization

- Pages: `src/app/<route>/page.tsx`
- Components: `src/components/` (colocated when small)
- 3D scene components colocated or in `src/scenes/`
- Styling: Tailwind utility classes + `globals.css` for global tokens

## Naming

- PascalCase for components and files
- camelCase for functions, variables, hooks
- kebab-case for CSS classes (Tailwind)
- Suffix 3D components with `Scene` or `3D` for clarity

## Component patterns

```tsx
'use client';

import { Engine } from 'reactylon/web';
import { Scene } from 'reactylon';

export default function MyScene() {
  return (
    <Engine>
      <Scene onSceneReady={(scene) => {
        scene.createDefaultCameraOrLight(true, undefined, true);
      }}>
        {/* 3D content */}
      </Scene>
    </Engine>
  );
}
```

## Git

- Descriptive commit messages
- No force pushes
- Keep commits focused on single concerns

## Brain updates

- Every AI session must write a session log in `brain/sessions/`
- Update topic files when new information is discovered
- Keep `brain/_index.md` in sync with available files
- Create ADRs for significant architectural decisions
- Remove stale information — don't accumulate obsolete notes

## Linting & formatting

- ESLint 9 flat config (`eslint.config.mjs`)
- Uses `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`
- `react-hooks/immutability` rule disabled
- Run: `npm run lint`
