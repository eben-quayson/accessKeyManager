
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const keyRoutes = require('./routes/keys');
const router = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 30 } 
}));

app.use('/auth', authRoutes);
app.use('/keys', keyRoutes);






app.length(req, res)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




router.get('/forgot-password', (req, res) => {
  res.render('forgot-password');
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
 



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 30 } // 30 minutes
}));

app.use('/auth', authRoutes);
app.use('/keys', keyRoutes);

app.get('/', (req, res) => {
  res.redirect('/auth/login');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



