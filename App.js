
const express = require('express');
<<<<<<< HEAD
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');

=======
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
>>>>>>> 39c0eb35780ca29964b48c14ff42fd19d90c2553
dotenv.config();

const authRoutes = require('./routes/auth');
const keyRoutes = require('./routes/keys');

const app = express();
const PORT = process.env.PORT || 1000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/auth', authRoutes);
app.use('/keys', keyRoutes);

app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
