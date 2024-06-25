const { pool } = require('../config/pool');

class PasswordReset {
    static async createResetRequest(email, token, expiration) {
        const result = await pool.query(
            'INSERT INTO password_resets (email, token, expiration) VALUES ($1, $2, $3) RETURNING *',
            [email, token, expiration]
        );
        return result.rows[0];
    }

    static async findResetRequestByToken(token) {
        const result = await pool.query('SELECT * FROM password_resets WHERE token = $1', [token]);
        return result.rows[0];
    }

    static async deleteResetRequestByToken(token) {
        const result = await pool.query('DELETE FROM password_resets WHERE token = $1', [token]);
        return result.rowCount > 0;
    }
}

module.exports = PasswordReset;
