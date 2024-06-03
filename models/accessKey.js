const pool = require('../config/db');

const createAccessKeyTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS access_keys (
      id INT AUTO_INCREMENT PRIMARY KEY,
      key VARCHAR(32) NOT NULL UNIQUE,
      school_id INT NOT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      expiration_date DATETIME NOT NULL,
      FOREIGN KEY (school_id) REFERENCES schools(id)
    );
  `;
  await pool.query(query);
};

const createAccessKey = async (key) => {
  const { keyValue, schoolId, expirationDate } = key;
  const [result] = await pool.query('INSERT INTO access_keys (key, school_id, is_active, expiration_date) VALUES (?, ?, ?, ?)', [keyValue, schoolId, true, expirationDate]);
  return { id: result.insertId, ...key };
};

const getAccessKeyByKey = async (keyValue) => {
  const [rows] = await pool.query('SELECT * FROM access_keys WHERE key = ?', [keyValue]);
  return rows[0];
};

module.exports = {
  createAccessKeyTable,
  createAccessKey,
  getAccessKeyByKey
};
