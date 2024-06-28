const express = require('express');
const router = express.Router();
const KeyController = require('../controllers/keyController'); 


router.get('/keys', KeyController.getAllKeys);
router.get('/user/keys', KeyController.getUserKeys);

module.exports = router;
