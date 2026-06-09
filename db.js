require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    student_id UUID,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    other_name VARCHAR(255),
    class VARCHAR(50),
    stream VARCHAR(50),
    term_joined VARCHAR(50),
    innovation_club BOOLEAN DEFAULT FALSE,
    ai_club BOOLEAN DEFAULT FALSE,
    iscc BOOLEAN DEFAULT FALSE,
    date_registered TIMESTAMP,
    gender VARCHAR(20),
    section VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(50),
    school_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
  );
`).catch(err => {
  console.error('Failed to create table:', err.message);
});

module.exports = pool;
