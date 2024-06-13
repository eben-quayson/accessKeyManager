const express = require('express');
const keyController = require('../controllers/keyController');

const router = express.Router();

router.get('/', keyController.getAllKeys);
router.post('/revoke/:keyId', keyController.revokeKey);
router.get('/status/:email', keyController.getKeyStatus);

module.exports = router;
