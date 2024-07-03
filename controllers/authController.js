const { signup, signin } = require('../services/authService');
const { verifyUser, findUserByVerificationToken } = require('../models/user');

class AuthController {
    static async signup(req, res) {
        try {
            const { email, password } = req.body;
            const user = await signup(email, password);
            req.session.userId = user.email;
            res.redirect('/dashboard');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async signin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await signin(email, password);
            if (user) {
                req.session.userId = user.email;
                res.redirect('/dashboard');
            } else {
                res.redirect('/auth/signin');
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async verifyEmail(req, res) {
        try {
            const { token } = req.params;
            const user = await findUserByVerificationToken(token);
            if (user) {
                await verifyUser(user.email);
                res.send('Email verified successfully');
            } else {
                res.status(400).send('Invalid or expired token');
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static signout(req, res) {
        req.session.destroy(() => {
            res.redirect('/auth/signin');
        });
    }
}

module.exports = AuthController;
