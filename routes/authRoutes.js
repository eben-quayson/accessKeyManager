const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);
router.get('/signout', AuthController.signout);
router.get('/verify/:token', AuthController.verifyEmail);
router.get('/signup', AuthController.signup);


module.exports = router;
