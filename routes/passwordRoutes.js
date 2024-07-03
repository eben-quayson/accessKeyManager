const express = require('express');
const router = express.Router();
const PasswordController = require('../controllers/passwordController');


router.get('/request', PasswordController.getRequestForm);
router.post('/request', PasswordController.requestReset);
router.get('/reset/:token', PasswordController.getResetForm);
router.post('/reset/:token', PasswordController.resetPassword);

module.exports = router;
