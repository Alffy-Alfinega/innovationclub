# innovationclub — AGENTS.md

Express 4 + EJS webapp.

## Commands

```bash
npm start    # start production server
npm run dev  # dev server with nodemon (auto-restart)
```

Both serve at `http://localhost:3000`.

## Architecture

- `app.js` — Express entry point
- `db.js` — PostgreSQL pool + schema (Neon)
- `views/` — EJS templates (partials in `views/partials/`)
- `public/` — static assets (css, js, images, favicon)

## Database

- **Neon PostgreSQL** — `students` table
- Schema: `student_id` (UUID PK), `first_name`, `middle_name`, `last_name`, `other_name`, `gender`, `date_of_birth`, `class`, `stream`, `section`, `term_joined`, `school_name`, `email`, `phone`, `innovation_club`, `ai_club`, `iscc`, `student_status`
- 17 records migrated from `onnovation.accdb`
