const pool = require('../config/database');

async function createSchool(name) {
  const result = await pool.query(
    'INSERT INTO schools (name) VALUES ($1) RETURNING *',
    [name]
  );
  return result.rows[0];
}

async function getSchoolById(id) {
  const result = await pool.query('SELECT * FROM schools WHERE id = $1', [id]);
  return result.rows[0];
}

module.exports = {
  createSchool,
  getSchoolById,
};
