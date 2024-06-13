const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.getSignIn);
router.get('/signup', authController.getSignUp);
router.post('/signup', authController.signUp);
router.get('/verify', authController.verifyEmail);
router.post('/login', authController.signIn);
router.post('/logout', authController.logout);
router.get('/forgot-password', authController.getForgotPassword);
router.post('/forgot-password', authController.forgotPassword);
router.get('/reset-password', authController.getResetPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
