const express = require('express');
const nodemailer = require('nodemailer');
const pool = require('../config/db');
const LRU = require('lru-cache');
const crypto = require('crypto');
const session = require('express-session');

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

async function findUserByEmail(email) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

async function createUser(email, password, role) {
  const hashedPassword = hashPassword(password);
  await pool.query(
    'INSERT INTO users (email, password, role, verified) VALUES ($1, $2, $3, $4)',
    [email, hashedPassword, role, false]
  );
}

router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;
  await createUser(email, password, role);

  const verificationUrl = `http://localhost:${process.env.PORT}/auth/verify?email=${email}`;

  await transporter.sendMail({
    to: email,
    subject: 'Verify Your Email',
    html: `<a href="${verificationUrl}">Verify your email</a>`,
  });

  res.status(201).send('User registered. Please check your email to verify your account.');
});

router.get('/verify', async (req, res) => {
  const { email } = req.query;
  await pool.query('UPDATE users SET verified = $1 WHERE email = $2', [true, email]);
  res.send('Email verified successfully.');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = hashPassword(password);
  const user = await findUserByEmail(email);
  
  if (!user || user.password !== hashedPassword) {
    return res.status(400).send('Invalid credentials.');
  }
  if (!user.verified) {
    return res.status(400).send('Please verify your email.');
  }
  req.session.userId = user.id;
  req.session.role = user.role;
  res.send('Logged in successfully.');
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out.');
    }
    res.send('Logged out successfully.');
  });
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).send('User not found.');
  }
  const resetToken = Math.random().toString(36).substr(2);
  await pool.query('UPDATE users SET reset_token = $1 WHERE email = $2', [resetToken, email]);
  const resetUrl = `http://localhost:${process.env.PORT}/auth/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    to: email,
    subject: 'Reset Password',
    html: `<a href="${resetUrl}">Reset your password</a>`,
  });

  res.send('Password reset email sent.');
});

router.get('/reset-password', (req, res) => {
  res.render('reset-password', { token: req.query.token });
});

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  const userResult = await pool.query('SELECT * FROM users WHERE reset_token = $1', [token]);
  const user = userResult.rows[0];
  if (user) {
    const hashedPassword = hashPassword(password);
    await pool.query('UPDATE users SET password = $1, reset_token = $2 WHERE id = $3', [hashedPassword, null, user.id]);
    res.send('Password reset successfully.');
  } else {
    res.status(400).send('Invalid token.');
  }
});

module.exports = router;
