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
    static async getDashboard(req, res) {
        try {
            const userEmail = req.session.userId;
            if (!userEmail) {
                return res.redirect('/auth/signin');
            }

            const user = await User.findOne({ email: userEmail });
            if (!user) {
                return res.redirect('/auth/signin');
            }

            res.render('dashboard', { user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = AuthController;
