const pool = require('../config/database');
const { hashPassword } = require('../utils/hash');

async function createUser(email, password, role) {
  const hashedPassword = hashPassword(password);
  const result = await pool.query(
    'INSERT INTO users (email, password, role, verified) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, hashedPassword, role, false]
  );
  return result.rows[0];
}

async function getUserByEmail(email) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

async function getUserById(id) {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

async function verifyUserEmail(email) {
  await pool.query('UPDATE users SET verified = $1 WHERE email = $2', [true, email]);
}

async function setResetToken(email, token) {
  await pool.query('UPDATE users SET reset_token = $1 WHERE email = $2', [token, email]);
}

async function resetPassword(token, password) {
  const hashedPassword = hashPassword(password);
  await pool.query('UPDATE users SET password = $1, reset_token = $2 WHERE reset_token = $3', [hashedPassword, null, token]);
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  verifyUserEmail,
  setResetToken,
  resetPassword,
};
