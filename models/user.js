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


/*const pool = require('../config/config').pool;

class User {
    static async findOne(params) {
        const { email, id } = params;
        let result;
        if (email) {
            result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        } else if (id) {
            result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        }
        return result.rows[0];
    }
}

module.exports = User;
*/