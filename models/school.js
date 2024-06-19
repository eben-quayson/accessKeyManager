const pool = require('../config/database');



async function createSchool(email, password, role) {
  const result = await pool.query(
    'INSERT INTO schools (name, password, role) VALUES ($1) RETURNING *',
    [email, password, role]
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
