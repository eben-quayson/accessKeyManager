const { pool } = require('../config/pool');

class AccessKey {
    static async createKey(schoolId) {
        const key = require('crypto').randomBytes(16).toString('hex');
        const result = await pool.query(
            'INSERT INTO access_keys (key, school_id, is_active) VALUES ($1, $2, $3) RETURNING *',
            [key, schoolId, false]
        );
        return result.rows[0];
    }

    static async getKeyByKey(key) {
        const result = await pool.query('SELECT * FROM access_keys WHERE key = $1', [key]);
        return result.rows[0];
    }

    static async activateKey(key) {
        const result = await pool.query(
            'UPDATE access_keys SET is_active = $1 WHERE key = $2 RETURNING *',
            [true, key]
        );
        return result.rows[0];
    }
}

module.exports = AccessKey;
