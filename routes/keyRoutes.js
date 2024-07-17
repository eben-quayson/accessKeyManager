const express = require('express');
const router = express.Router();
const KeyController = require('../controllers/keyController'); 


router.get('/keys', KeyController.getAllKeys);
router.get('/user/keys', KeyController.getUserKeys);
router.get('/generateKey', KeyController.generateKey);
router.post('/generateKey', KeyController.generateKey);

module.exports = router;
