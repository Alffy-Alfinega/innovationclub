# Innovation Club — Project Brain

> **Project:** `innovationclub` — Young Innovators registration portal  
> **URL:** [http://localhost:3000](http://localhost:3000)  
> **Stack:** Express 4 + EJS + PostgreSQL (Neon)  
> **Git:** Local, branch `alffy`  
> **License:** MIT (2026 Alffy / Alfinega)

---

## Map of Content

### Foundation
- [[foundation/stack]] — Tech stack table with versions
- [[foundation/configuration]] — package.json, app.js, env
- [[foundation/design]] — Colors, typography, CSS custom properties
- [[foundation/infrastructure]] — Neon DB, hosting, deployment
- [[foundation/env]] — Environment variables reference

### Routes
- [[routes/map]] — All routes, metadata, render logic

### Views
- [[views/overview]] — EJS templates, partials, styling patterns

### Data
- [[data/overview]] — Data layer, migration from Access DB

### Database
- [[database/schema]] — students table schema

### Business
- [[business/program]] — Program info, targets, team

### History
- [[changelog/_index]] — Change log

---

## Quick Links

| Area | Key File(s) |
|---|---|
| Entry point | `app.js` |
| Database pool | `db.js` |
| Homepage | `views/index.ejs` |
| Registration form | `views/register.ejs` |
| Success page | `views/success.ejs` |
| Header | `views/partials/header.ejs` |
| Footer | `views/partials/footer.ejs` |
| Design tokens | `public/css/style.css` |
| Logo | `public/logo-nav.png` |
| Favicon | `public/favicon.ico` |

---

## File Count

| Category | Count |
|---|---|
| Pages (EJS) | 4 |
| Partials | 2 |
| Config files | 4 (package.json, .env, .gitignore, AGENTS.md) |
| Source (JS) | 2 (app.js, db.js) |
| Static assets | 4 (css, logo, favicon) |
| **Total** | **~16 files** |

### Analysis
- [[analysis/current-state-audit]] — Critical bugs, security gaps, missing features (2026-06-24)

### Projects
- [[projects/zayed-sustainability-prize]] — Vascular Earth Initiative, Zayed 2027 application
