const pool = require('../config/database');


const createSchoolTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(120) NOT NULL UNIQUE,
      is_active BOOLEAN DEFAULT FALSE
    );
  `;
  await pool.query(query);
};

const getSchoolByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM schools WHERE email = ?', [email]);
  return rows[0];
};

const createSchool = async (school) => {
  const { name, email, isActive } = school;
  const [result] = await pool.query('INSERT INTO schools (name, email, is_active) VALUES (?, ?, ?)', [name, email, isActive]);
  return { id: result.insertId, ...school };
};

module.exports = {
  createSchoolTable,
  getSchoolByEmail,
  createSchool
};
