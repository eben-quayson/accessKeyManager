const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.post('/signin', AuthController.signin);
router.get('/signout', AuthController.signout);
// router.get('/verify/:token', AuthController.verifyEmail);


// forms
router.get('/signup', AuthController.renderSignUpForm);
router.get('/signin', AuthController.renderSignInForm);
router.post('/signup', AuthController.signup);
router.post('/sighout', AuthController.signout);


module.exports = router;