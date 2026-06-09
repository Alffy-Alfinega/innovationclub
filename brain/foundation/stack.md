# Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js | ^26 |
| Framework | Express | ^4.21 |
| Template Engine | EJS | ^3.1 |
| Database | PostgreSQL (Neon) | 16 |
| DB Driver | pg (node-postgres) | ^9 |
| Dev Tooling | nodemon | ^3.1 |
| Env Management | dotenv | ^16 |

## Why This Stack

- **Express + EJS** — Simple, fast, server-rendered. No client-side JS framework overhead.
- **Neon PostgreSQL** — Serverless Postgres with pooling, free tier, and automatic scaling.
- **pg** — The standard Node.js PostgreSQL driver. Minimal abstraction.
- **nodemon** — Auto-restarts on file changes during development.
