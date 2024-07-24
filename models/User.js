const { Pool } = require('pg');
const { pool } = require('../config/config');

const addUser = async (email, password, verificationToken) => {

    const query = `
        INSERT INTO users (email, password, verification_token) 
        VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [email, password, verificationToken];
    const result = await pool.query(query, values);
    return result.rows[0];
};
async function findByEmail(email) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );
        return result.rows[0];
    } finally {
        client.release();
    }
};
const findUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1;`;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
};
async function updatePasswordByEmail(email, hashedPassword) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `UPDATE users SET password = $1 WHERE email = $2`,
            [hashedPassword, email]
        );
        return result.rowCount > 0; // Returns true if update was successful
    } finally {
        client.release();
    }
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
    // createUserTable,
    addUser,
    findUserByEmail,
    findUserByVerificationToken,
    verifyUser,
    updatePasswordByEmail,
    findByEmail

};
