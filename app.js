require('dotenv').config();
const express = require('express');
const path = require('path');
const crypto = require('crypto');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const classes = ['Form 1', 'Form 2', 'Form 3', 'Form 5'];
const streams = { 'Form 1': ['North', 'South', 'East', 'West'], 'Form 2': ['North', 'South', 'East', 'West'], 'Form 3': ['North', 'South', 'East', 'West'], 'Form 5': ['Arts', 'Sciences'] };
const terms = ['Term 1', 'Term 2', 'Term 3'];
const statuses = ['Day scholar', 'Boarding scholar'];
const school = 'Makindye Secondary School';

app.get('/', (req, res) => {
  res.render('index', { title: 'Innovation Club — Alffy' });
});

app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register — Innovation Club',
    classes, streams, terms, statuses, school,
    errors: [],
    form: {},
  });
});

app.post('/register', async (req, res) => {
  const {
    firstName, middleName, lastName, otherName,
    gender, class: studentClass, stream, studentStatus,
    termJoined, schoolName, email, phone,
    innovationClub, aiClub, iscc, agree,
  } = req.body;

  const errors = [];
  if (!firstName || firstName.trim().length < 2) errors.push('First name is required.');
  if (!lastName || lastName.trim().length < 2) errors.push('Last name is required.');
  if (!studentClass) errors.push('Class is required.');
  if (!agree) errors.push('You must agree to the terms.');

  if (errors.length > 0) {
    return res.render('register', {
      title: 'Register — Innovation Club',
      classes, streams, terms, statuses, school,
      errors,
      form: req.body,
    });
  }

  try {
    const studentId = crypto.randomUUID();
    await pool.query(`
      INSERT INTO students (
        student_id, first_name, middle_name, last_name, other_name,
        gender, class, stream, student_status, term_joined, school_name,
        email, phone,
        innovation_club, ai_club, iscc
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
    `, [
      studentId,
      firstName.trim(), middleName || null, lastName.trim(), otherName || null,
      gender || null, studentClass, stream || null, studentStatus || null,
      termJoined || null, schoolName || 'Makindye Secondary School',
      email || null, phone || null,
      innovationClub === 'on', aiClub === 'on', iscc === 'on',
    ]);
    res.render('success', {
      title: 'Registered — Innovation Club',
      name: `${firstName.trim()} ${lastName.trim()}`,
    });
  } catch (err) {
    console.error(err);
    errors.push('Something went wrong. Please try again.');
    res.render('register', {
      title: 'Register — Innovation Club',
      classes, streams, terms, statuses, school,
      errors,
      form: req.body,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Innovation Club running on http://localhost:${PORT}`);
});
