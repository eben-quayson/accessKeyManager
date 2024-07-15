const { pool } = require('../config/config');

class User {
    static async createUser(email, password) {
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, password]
        );
        return result.rows[0];
    }

    static async getUserByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }

    static async updatePasswordByEmail(email, password) {
        const result = await pool.query(
            'UPDATE users SET password = $1 WHERE email = $2 RETURNING *',
            [password, email]
        );
        return result.rows[0];
    }
}

module.exports = User;
