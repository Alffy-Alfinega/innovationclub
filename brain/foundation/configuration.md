# Configuration

## `package.json`

```json
{
  "name": "innovationclub",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "dotenv": "^16",
    "ejs": "^3.1",
    "express": "^4.21",
    "pg": "^9"
  },
  "devDependencies": {
    "nodemon": "^3.1"
  }
}
```

## `app.js` Structure

1. Load `.env` via `dotenv.config()`
2. Create Express app on `PORT` (default `3000`)
3. Set EJS as view engine with `views/` directory
4. Serve static assets from `public/`
5. Parse URL-encoded form bodies (`express.urlencoded`)
6. Define routes:
   - `GET /` — Homepage
   - `GET /register` — Registration form
   - `POST /register` — Form submission handler
7. Listen on `PORT`

## `.env`

```env
DATABASE_URL=postgresql://...
```
