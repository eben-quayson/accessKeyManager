const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');


router.get('/signin', (req, res) => res.render('signin'));
router.get('/signup', (req, res) => res.render('signup'));
router.get('./dashbord',(req,res) => res.render('dashboard'));

router.post('/signin', AuthController.signin);
router.post('/signup', AuthController.signup);
router.post('/signout', AuthController.signout);
router.post('/dashboard', AuthController.dashboard);

module.exports = router;
