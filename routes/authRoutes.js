const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// GET Sign In Page
router.get('/signin', (req, res) => res.render('signin'));

// GET Sign Up Page
router.get('/signup', (req, res) => res.render('signup'));

// POST Sign In
router.post('/signin', AuthController.signin);

// POST Sign Up
router.post('/signup', AuthController.signup);

// POST Sign Out
router.post('/signout', AuthController.signout);

module.exports = router;
