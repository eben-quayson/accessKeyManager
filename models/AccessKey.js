const crypto = require('crypto');
const { pool } = require('../config/config');

class AccessKey {
    static async createKey(email) {
        const key = crypto.randomBytes(16).toString('hex');
        const client = await pool.connect();
        try {
            const result = await client.query(
                `INSERT INTO access_keys (key, email, creation_date, expiration_date)
                 VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 year')
                 RETURNING *`,
                [key, email]
            );
            return result.rows[0];
        } finally {
            client.release();
        }
    }

    static async getKeysByEmail(email) {
        const client = await pool.connect();
        try {
            const result = await client.query(
                `SELECT * FROM access_keys WHERE email = $1`,
                [email]
            );
            return result.rows;
        } finally {
            client.release();
        }
    }

    static async getAllKeys() {
        const client = await pool.connect();
        try {
            const result = await client.query(`SELECT * FROM access_keys`);
            return result.rows;
        } finally {
            client.release();
        }
    }
}

module.exports = AccessKey;
