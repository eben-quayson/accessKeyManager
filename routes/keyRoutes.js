const express = require('express');
const router = express.Router();
const keyController = require('../controllers/keyController'); 


router.get('/keys', keyController.getAllKeys);
router.get('/user/keys', keyController.getUserKeys);
router.get('/generateKey', keyController.generateKey);
router.post('/generateKey', keyController.generateKey);




module.exports = router;
