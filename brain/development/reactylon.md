# Reactylon / Babylon.js Guide

## Reactylon specifics

- **Version**: 3.5.0
- **Package**: `reactylon` (web export: `reactylon/web`)
- **Requires**: `babel-plugin-reactylon` ^1.3.1 in `babel.config.js`
- **Components must be `'use client'`** — Reactylon depends on browser APIs

## Basic structure

```tsx
'use client';

import { Engine } from 'reactylon/web';
import { Scene } from 'reactylon';

export default function SceneWrapper() {
  return (
    <Engine antialias adaptToDeviceRatio>
      <Scene onSceneReady={handleSceneReady}>
        {/* 3D meshes, lights, cameras go here */}
      </Scene>
    </Engine>
  );
}
```

## Scene setup

```ts
// Quick default setup (used in starter):
scene.createDefaultCameraOrLight(true, undefined, true);

// Parameters:
//   createLight: true
//   camera position: undefined (auto)
//   autoTarget: true
```

## Important files

- `babel.config.js` — must contain `['babel-plugin-reactylon']` in plugins
- `src/app/page.tsx` — wraps app in `<Engine>` / `<Scene>`
- `src/app/Content.tsx` — application content rendered inside the scene
