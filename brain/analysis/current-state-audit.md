# Current State Audit — Innovation Club

> **Date:** 2026-06-24  
> **Auditor:** Claude (Lead Engineering Agent)  
> **Status:** Phase 0 MVP — functional but critically under-engineered

---

## What Exists

| Layer | Status | Quality |
|---|---|---|
| Landing page | ✅ Done | Good design system, solid |
| Registration form | ✅ Done | Functional, minimal validation |
| PostgreSQL schema | ✅ Done | Adequate for MVP |
| Neon DB connection | ✅ Done | Works, no error handling |
| Brain vault | ✅ Done | Well-structured |
| Tests | ❌ None | Zero coverage |
| Auth / Admin | ❌ None | No way to view registrants |
| Input sanitisation | ❌ None | XSS/SQLi risk |
| Rate limiting | ❌ None | Spam-open |
| Error pages | ❌ None | Raw Express errors exposed |
| Email confirmation | ❌ None | No student receives anything |
| Deployment | ❌ Unknown | Local only, no CI/CD |
| date_of_birth column | ❌ Missing in schema | In AGENTS.md spec but not in db.js CREATE TABLE |

---

## Critical Bugs Found

### 1. Schema Drift — `date_of_birth` Missing
- **AGENTS.md** lists `date_of_birth` as a column
- **db.js** `CREATE TABLE IF NOT EXISTS` does NOT include it
- **app.js** never inserts it either
- **Brain/database/schema.md** defines it
- **Result:** The brain, AGENTS.md and reality disagree. Classic drift.

### 2. `section` Column — Defined Nowhere Active
- Schema note mentions `section` column
- `db.js` does not create it
- `app.js` does not insert it
- Dead field.

### 3. No CSRF Protection on POST /register
- Form accepts any cross-origin POST
- Any external site can submit fake registrations

### 4. Checkbox Booleans — Fragile Pattern
- `innovationClub === 'on'` — if field name ever changes, silently inserts FALSE
- No joi/zod validation schema

### 5. `schoolName` Hardcoded Fallback
- `schoolName || 'Makindye Secondary School'`
- This is a multi-school platform per the business spec (50+ schools)
- Hardcoding one school as default is wrong

### 6. db.js Runs DDL on Every Startup
- `pool.query(CREATE TABLE IF NOT EXISTS...)` runs on module load
- Fine for dev, dangerous in production (implicit migration)
- No migration system

---

## Security Gaps

| Issue | Severity | Notes |
|---|---|---|
| No CSRF token | High | Open to cross-origin form spam |
| No rate limit | High | Bot registration flood possible |
| No input sanitisation | Medium | EJS auto-escapes on render but raw DB storage |
| DB URL in .env not validated at startup | Medium | Silent crash if missing |
| No helmet / security headers | Medium | XSS, clickjacking exposure |

---

## Missing Pieces vs. Business Goal

The business goal is **50+ schools, free access, 24/7 mentor support**.
The current system is a **single-school registration form** with no:
- Admin dashboard to view/manage students
- Multi-school architecture
- Mentor system
- Notification system
- Any operational visibility

---

## What's Actually Good

- Design system is clean and well-structured
- Brain vault is properly maintained
- EJS templates are readable
- Neon DB choice is sensible
- brain-first protocol is in place

