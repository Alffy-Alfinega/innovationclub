require('dotenv').config();
const { Pool } = require('pg');
const crypto = require('crypto');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS students (
    student_id UUID PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    other_name VARCHAR(255),
    gender VARCHAR(20),
    date_of_birth DATE,
    class VARCHAR(50) NOT NULL,
    stream VARCHAR(50),
    section VARCHAR(50),
    term_joined VARCHAR(50),
    school_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    innovation_club BOOLEAN DEFAULT FALSE,
    ai_club BOOLEAN DEFAULT FALSE,
    iscc BOOLEAN DEFAULT FALSE,
    student_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
  );
`).catch(err => {
  console.error('Failed to create table:', err.message);
});

module.exports = pool;
