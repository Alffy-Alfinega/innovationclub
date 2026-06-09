require('dotenv').config();
const express = require('express');
const path = require('path');
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

app.get('/', (req, res) => {
  res.render('index', { title: 'Young Innovators — Alffy' });
});

app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register — Young Innovators',
    classes,
    streams,
    terms,
    sections,
    errors: [],
    form: {},
  });
});

app.post('/register', async (req, res) => {
  const {
    firstName, middleName, lastName, otherName,
    class: studentClass, stream, termJoined,
    innovationClub, aiClub, iscc,
    gender, section,
    email, phone, schoolName, agree,
  } = req.body;

  const errors = [];
  if (!firstName || firstName.trim().length < 2) errors.push('First name is required.');
  if (!lastName || lastName.trim().length < 2) errors.push('Last name is required.');
  if (!agree) errors.push('You must agree to the terms.');

  if (errors.length > 0) {
    return res.render('register', {
      title: 'Register — Young Innovators',
      classes,
      streams,
      terms,
      sections,
      errors,
      form: req.body,
    });
  }

  try {
    const result = await pool.query(`
      INSERT INTO students (
        first_name, middle_name, last_name, other_name,
        class, stream, term_joined,
        innovation_club, ai_club, iscc,
        gender, section,
        email, phone, school_name
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      RETURNING id
    `, [
      firstName.trim(), middleName || null, lastName.trim(), otherName || null,
      studentClass || null, stream || null, termJoined || null,
      innovationClub === 'on', aiClub === 'on', iscc === 'on',
      gender || null, section || null,
      email || null, phone || null, schoolName || null,
    ]);
    res.render('success', {
      title: 'Registered — Young Innovators',
      name: `${firstName.trim()} ${lastName.trim()}`,
    });
  } catch (err) {
    errors.push('Something went wrong. Please try again.');
    res.render('register', {
      title: 'Register — Young Innovators',
      classes,
      streams,
      terms,
      sections,
      errors,
      form: req.body,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Young Innovators running on http://localhost:${PORT}`);
});
