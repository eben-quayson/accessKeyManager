const { pool } = require('../config/config');

class AccessKey {
    static async createKey(userId) {
        const key = crypto.randomBytes(16).toString('hex');
        const client = await pool.connect();
        try {
            const result = await client.query(
                `INSERT INTO access_keys (key, user_id, creation_date, expiration_date)
                 VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 year')
                 RETURNING *`,
                [key, userId]
            );
            return result.rows[0];
        } finally {
            client.release();
        }
    }

    static async getKeysByUser(userId) {
        const client = await pool.connect();
        try {
            const result = await client.query(
                `SELECT * FROM access_keys WHERE user_id = $1`,
                [userId]
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
