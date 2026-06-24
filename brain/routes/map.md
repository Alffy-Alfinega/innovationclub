# Route Map

| Route | Method | View | Description |
|---|---|---|---|
| `/` | GET | `index.ejs` | Homepage — hero, program info, Alffy services |
| `/register` | GET | `register.ejs` | Registration form |
| `/register` | POST | — | Submit registration, redirect to success |
| `/*` (success) | — | `success.ejs` | Post-registration confirmation |

## Route Details

### `GET /`
Renders the landing page with hero section, "What We Do" cards, "Who Can Join" section, and "Built by Alffy" service list with mission stats.

### `GET /register`
Renders the registration form with dropdown options for:
- Class (Form1–Form6)
- Stream (Science, Arts, Technology, Business, General)
- Section (Junior, Senior, A-Level, O-Level)
- Term Joined (Term 1–3)
- Gender (Male, Female, Other)
- Student Status (Active, Inactive, Graduated, Transferred)

Plus: name fields (first, middle, last, other), date of birth, school name, email, phone, and club checkboxes (Innovation Club, AI Club, ISCC).

### `POST /register`
Validates input, generates a UUID `student_id`, inserts into PostgreSQL, and renders success page on completion. Returns form with errors if validation fails.

### `GET /makss/zayed/soilSkeleton`
Renders the Vascular Earth Initiative showcase page. Publicly accessible, no auth required. No DB queries — static content only.
