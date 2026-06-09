# Changelog

## 2026-06-09 — Rebrand to Innovation Club

- Rebranded "Young Innovators" → "Innovation Club"
- Updated logo to use Alffy `logo-nav.png`
- Added `favicon.ico` from parent site
- Updated database schema with `date_of_birth`, `student_status`, UUID PK
- Redesigned registration form with new fields
- Migrated 17 records from `onnovation.accdb`
- Cleared migration scripts

## 2026-06-09 — Alffy v2 Theme

- Full CSS rewrite using parent design system:
  - Dark theme: `#04040C` bg, `#2C6FED` blue, `#D4A843` gold
  - Syne + Outfit + JetBrains Mono fonts
  - Fixed navbar with blur, mobile hamburger menu
  - Card grid, service list, animated hero
- Registration form with PostgreSQL integration
- Neon DB connection with auto-create schema
- Original "Young Innovators" branding

## 2026-06-09 — Initial Scaffold

- Express 4 + EJS project setup
- Basic dark header/footer with navy theme
- Homepage and registration placeholder
