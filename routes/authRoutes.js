const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');


router.get('/signin', (req, res) => res.render('signin'));
router.get('/signup', (req, res) => res.render('signup'));
router.post('/signin', AuthController.signin);
router.post('/signup', AuthController.signup);
router.post('/signout', AuthController.signout);
router.get('./dashbord', AuthController.getDashboard)

module.exports = router;
