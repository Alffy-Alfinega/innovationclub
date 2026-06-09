# Database Schema

## `students` Table

```sql
CREATE TABLE students (
  student_id      UUID PRIMARY KEY,
  first_name      VARCHAR(255) NOT NULL,
  middle_name     VARCHAR(255),
  last_name       VARCHAR(255) NOT NULL,
  other_name      VARCHAR(255),
  gender          VARCHAR(20),
  date_of_birth   DATE,
  class           VARCHAR(50) NOT NULL,
  stream          VARCHAR(50),
  section         VARCHAR(50),
  term_joined     VARCHAR(50),
  school_name     VARCHAR(255),
  email           VARCHAR(255),
  phone           VARCHAR(50),
  innovation_club BOOLEAN DEFAULT FALSE,
  ai_club         BOOLEAN DEFAULT FALSE,
  iscc            BOOLEAN DEFAULT FALSE,
  student_status  VARCHAR(50),
  created_at      TIMESTAMP DEFAULT NOW()
);
```

## Column Notes

| Column | Source | Notes |
|---|---|---|
| `student_id` | `crypto.randomUUID()` | Generated server-side on insert |
| `first_name` | Access `firstName` | Required |
| `last_name` | Access `lastName` | Required |
| `class` | Access `class` | Required, e.g. Form1–Form6 |
| `innovation_club` | Access `innovationClub` | Checkbox |
| `ai_club` | Access `aiClub` | Checkbox |
| `iscc` | Access `iscc` | Checkbox |
| `email` | Web form | Contact field, not in Access |
| `phone` | Web form | Contact field, not in Access |
| `school_name` | Web form | Not in Access |
| `date_of_birth` | Web form | Not in Access |
| `student_status` | Web form | Not in Access |

## Current Data

- **17 records** migrated from `onnovation.accdb`
- All records have `student_id`, names, class, gender, club booleans, section, term_joined, stream
- `email`, `phone`, `school_name`, `date_of_birth`, `student_status` are `NULL` for migrated rows
