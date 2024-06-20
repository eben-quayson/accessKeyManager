const express = require('express');
const router = express.Router();
const KeyController = require('../controllers/keyController');
const authMiddleware = require('../middleware/authMiddleware');

// GET All Keys
router.get('/', authMiddleware, KeyController.getKeys);

// POST Create New Key
router.post('/', authMiddleware, KeyController.createKey);

module.exports = router;
