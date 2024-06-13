const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.use((req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).send('Not authenticated.');
  }
  next();
});

router.get('/', async (req, res) => {
  const userId = req.session.userId;
  const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
  const user = userResult.rows[0];
  let keys;
  if (user.role === 'admin') {
    keys = await pool.query('SELECT * FROM access_keys');
  } else {
    keys = await pool.query('SELECT * FROM access_keys WHERE user_id = $1', [userId]);
  }
  res.json(keys.rows);
});

router.post('/purchase', async (req, res) => {
  const userId = req.session.userId;
  const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
  const user = userResult.rows[0];
  if (user.role !== 'school') {
    return res.status(403).send('Not authorized.');
  }
  const activeKeyResult = await pool.query('SELECT * FROM access_keys WHERE user_id = $1 AND status = $2', [userId, 'active']);
  if (activeKeyResult.rows.length > 0) {
    return res.status(400).send('Active key already exists.');
  }
  await pool.query(
    'INSERT INTO access_keys (user_id, status, procurement_date, expiry_date) VALUES ($1, $2, $3, $4)',
    [userId, 'active', new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1))]
  );
  res.status(201).send('Key purchased successfully.');
});

router.patch('/revoke/:keyId', async (req, res) => {
  const userId = req.session.userId;
  const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
  const user = userResult.rows[0];
  if (user.role !== 'admin') {
    return res.status(403).send('Not authorized.');
  }
  await pool.query('UPDATE access_keys SET status = $1 WHERE id = $2', ['revoked', req.params.keyId]);
  res.send('Key revoked successfully.');
});

router.get('/status/:email', async (req, res) => {
  const userId = req.session.userId;
  const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
  const user = userResult.rows[0];
  if (user.role !== 'admin') {
    return res.status(403).send('Not authorized.');
  }
  const schoolResult = await pool.query('SELECT * FROM users WHERE email = $1', [req.params.email]);
  const school = schoolResult.rows[0];
  if (!school) {
    return res.status(404).send('School not found.');
  }
  const activeKeyResult = await pool.query('SELECT * FROM access_keys WHERE user_id = $1 AND status = $2', [school.id, 'active']);
  const activeKey = activeKeyResult.rows[0];
  if (activeKey) {
    res.json(activeKey);
  } else {
    res.status(404).send('No active key found.');
  }
});

module.exports = router;
