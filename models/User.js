const { Pool } = require('pg');
const { pool } = require('../config/config');

const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            email VARCHAR(255) PRIMARY KEY,
            password TEXT NOT NULL,
            is_admin BOOLEAN DEFAULT FALSE,
            is_verified BOOLEAN DEFAULT FALSE,
            verification_token TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
    `;
    await pool.query(query);
};

const addUser = async (email, password, verificationToken) => {
    const query = `
        INSERT INTO users (email, password, verification_token) 
        VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [email, password, verificationToken];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1;`;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const findUserByVerificationToken = async (token) => {
    const query = `SELECT * FROM users WHERE verification_token = $1;`;
    const values = [token];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const verifyUser = async (email) => {
    const query = `UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE email = $1;`;
    const values = [email];
    await pool.query(query, values);
};

module.exports = {
    createUserTable,
    addUser,
    findUserByEmail,
    findUserByVerificationToken,
    verifyUser
};
