const express = require('express');
const router = express.Router();
const PasswordController = require('../controllers/passwordController');

// GET Reset Password Request Form
router.get('/request', PasswordController.getRequestForm);

// POST Reset Password Request
router.post('/request', PasswordController.requestReset);

// GET Reset Password Form
router.get('/reset/:token', PasswordController.getResetForm);

// POST Reset Password
router.post('/reset/:token', PasswordController.resetPassword);

module.exports = router;
