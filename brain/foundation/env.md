# Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string |

Set in `.env` for local dev. Must be configured in deployment dashboard for production.

```env
DATABASE_URL=postgresql://neondb_owner:...@ep-...pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require
```
