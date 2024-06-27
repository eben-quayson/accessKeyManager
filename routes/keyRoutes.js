const express = require('express');
const router = express.Router();
const KeyController = require('../controllers/keyController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware, KeyController.getKeys);

router.post('/', authMiddleware, KeyController.createKey);

module.exports = router;
