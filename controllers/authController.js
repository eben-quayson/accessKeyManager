const User = require('../models/User');
const AuthService = require('../services/authService');

class AuthController {
    static async signup(req, res) {
        try {
            const { email, password } = req.body;
            const user = await AuthService.signup(email, password);
            req.session.userId = user.email;
            res.redirect('/dashboard');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async signin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await AuthService.signin(email, password);
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

    static signout(req, res) {
        req.session.destroy(() => {
            res.redirect('/auth/signin');
        });
    }
}

module.exports = AuthController;
