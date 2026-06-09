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

const classes = ['Form1', 'Form2', 'Form3', 'Form4', 'Form5', 'Form6'];
const streams = ['Science', 'Arts', 'Technology', 'Business', 'General'];
const terms = ['Term 1', 'Term 2', 'Term 3'];
const sections = ['Junior', 'Senior', 'A-Level', 'O-Level'];
const statuses = ['Active', 'Inactive', 'Graduated', 'Transferred'];

app.get('/', (req, res) => {
  res.render('index', { title: 'Innovation Club — Alffy' });
});

app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register — Innovation Club',
    classes, streams, terms, sections, statuses,
    errors: [],
    form: {},
  });
});

app.post('/register', async (req, res) => {
  const {
    firstName, middleName, lastName, otherName,
    gender, dateOfBirth,
    class: studentClass, stream, section, termJoined, schoolName,
    email, phone,
    innovationClub, aiClub, iscc,
    studentStatus, agree,
  } = req.body;

  const errors = [];
  if (!firstName || firstName.trim().length < 2) errors.push('First name is required.');
  if (!lastName || lastName.trim().length < 2) errors.push('Last name is required.');
  if (!studentClass) errors.push('Class is required.');
  if (!agree) errors.push('You must agree to the terms.');

  if (errors.length > 0) {
    return res.render('register', {
      title: 'Register — Innovation Club',
      classes, streams, terms, sections, statuses,
      errors,
      form: req.body,
    });
  }

  try {
    const studentId = crypto.randomUUID();
    await pool.query(`
      INSERT INTO students (
        student_id, first_name, middle_name, last_name, other_name,
        gender, date_of_birth,
        class, stream, section, term_joined, school_name,
        email, phone,
        innovation_club, ai_club, iscc,
        student_status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
    `, [
      studentId,
      firstName.trim(), middleName || null, lastName.trim(), otherName || null,
      gender || null, dateOfBirth || null,
      studentClass, stream || null, section || null, termJoined || null, schoolName || null,
      email || null, phone || null,
      innovationClub === 'on', aiClub === 'on', iscc === 'on',
      studentStatus || null,
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
      classes, streams, terms, sections, statuses,
      errors,
      form: req.body,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Innovation Club running on http://localhost:${PORT}`);
});
