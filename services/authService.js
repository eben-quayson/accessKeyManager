const crypto = require('crypto');
const { pool } = require('../config/config');
const sendEmail = require('../utils/sendEmail');

class AuthService {
    static async signup(email, password) {
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        const verificationToken = crypto.randomBytes(16).toString('hex');

        const client = await pool.connect();
        try {
            const result = await client.query('INSERT INTO users (email, password, is_verified, verification_token) VALUES ($1, $2, $3, $4) RETURNING *', [email, hashedPassword, false, verificationToken]);
            const user = result.rows[0];
            
            const verificationLink = `${config.server.url}/auth/verify/${user.verification_token}`;

            const emailBody = `
                <p>Welcome to our platform!</p>
                <p>Please click the link below to verify your email:</p>
                <a href="${verificationLink}">Verify Email</a>
            `;

            await sendEmail(user.email, 'Email Verification', emailBody);

            return user;
        } finally {
            client.release();
        }
    }

    static async signin(email, password) {
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, hashedPassword]);
            const user = result.rows[0];

            if (user && user.is_verified) {
                return user;
            } else if (user && !user.is_verified) {
                throw new Error('Email not verified');
            } else {
                return null;
            }
        } finally {
            client.release();
        }
    }

    static async verifyEmail(token) {
        const client = await pool.connect();
        try {
            const result = await client.query('UPDATE users SET is_verified = $1 WHERE verification_token = $2 RETURNING *', [true, token]);
            return result.rowCount > 0;
        } finally {
            client.release();
        }
    }
}

module.exports = AuthService;
