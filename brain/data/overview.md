# Data Layer

## Flow

1. User fills registration form → `POST /register`
2. Server validates inputs
3. `crypto.randomUUID()` generates a `student_id`
4. `pool.query()` inserts into PostgreSQL
5. Success page rendered

## Migration

- **Source:** `onnovation.accdb` (Microsoft Access)
- **Rows:** 17 student records
- **Method:** PowerShell OLEDB read → JSON → bulk insert to Neon
- **Columns mapped:** `studentId` → `student_id`, `firstName` → `first_name`, etc.
- **Extra columns:** `email`, `phone`, `school_name`, `date_of_birth`, `student_status` available for web form but null in migrated data

## Query Pattern

```js
await pool.query(`
  INSERT INTO students (...) VALUES ($1,$2,...)
`, [val1, val2, ...]);
```

No ORM. Raw parameterised queries with `pg`.
