# Infrastructure

## Database

- **Provider:** Neon (serverless PostgreSQL)
- **Region:** EU West 2 (London)
- **Connection:** Pooled via `?sslmode=require`
- **Schema:** Single `students` table (see [[database/schema]])

## Deployment

- **Local dev:** `npm start` or `npm run dev`
- **Production:** Deployable to any Node.js host (Railway, Render, Fly.io, VPS)
- **Environment:** `DATABASE_URL` must be set via `.env` or host dashboard

## Git

- Branch: `alffy`
- Origin: `https://github.com/Alffy-Alfinega/innovationclub`
