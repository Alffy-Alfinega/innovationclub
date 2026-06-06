# Tech Stack

## Production dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | ^16.0.8 | Framework (App Router) |
| `react` | ^19.2.1 | UI library |
| `react-dom` | ^19.2.1 | DOM renderer |
| `reactylon` | ^3.5.0 | React bindings for Babylon.js |
| `@babylonjs/core` | ^9 | 3D engine core |
| `@babylonjs/gui` | ^9 | 3D GUI components |

## Dev dependencies

| Package | Version | Purpose |
|---|---|---|
| `typescript` | ^5 | Type checking |
| `eslint` | ^9 | Linting |
| `eslint-config-next` | 16.0.8 | Next.js ESLint config |
| `babel-plugin-reactylon` | ^1.3.1 | Reactylon JSX transform |
| `@types/node` | ^20 | Node type defs |
| `@types/react` | ^19 | React type defs |
| `@types/react-dom` | ^19 | ReactDOM type defs |
| `tailwindcss` | ^4.3.0 | Utility-first CSS |
| `postcss` | ^8.5.15 | CSS transformation pipeline |
| `autoprefixer` | ^10.5.0 | Vendor prefixing |

## Runtime

- Node.js >= 18 (Next.js 16 requirement)
- Modern browser with WebGL support (for Babylon.js)

## Environment

- `.env` contains Neon (Postgres) credentials in Vercel Postgres format:
  - `DATABASE_URL`, `POSTGRES_URL`, `PGHOST`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`
