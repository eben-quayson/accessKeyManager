const pool = require('../config/database');

async function createKey(schoolId, email) {
  const result = await pool.query(
    'INSERT INTO keys (school_id, email, status, procurement_date, expiry_date) VALUES ($1, $2, $3, NOW(), NOW() + INTERVAL \'1 year\') RETURNING *',
    [schoolId, email, 'active']
  );
  return result.rows[0];
}

async function getKeyById(id) {
  const result = await pool.query('SELECT * FROM keys WHERE id = $1', [id]);
  return result.rows[0];
}

async function getKeysByEmail(email) {
  const result = await pool.query('SELECT * FROM keys WHERE email = $1', [email]);
  return result.rows;
}

async function getActiveKeyByEmail(email) {
  const result = await pool.query('SELECT * FROM keys WHERE email = $1 AND status = $2', [email, 'active']);
  return result.rows[0];
}

async function revokeKey(id) {
  await pool.query('UPDATE keys SET status = $1 WHERE id = $2', ['revoked', id]);
}

module.exports = {
  createKey,
  getKeyById,
  getKeysByEmail,
  getActiveKeyByEmail,
  revokeKey,
};
