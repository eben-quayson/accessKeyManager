const authService = require('../services/authService');
const { verifyUser, findUserByVerificationToken } = require('../models/User');
const AccessKey = require('../models/AccessKey')

class AuthController {
    static renderSignUpForm (req, res) {
        res.render("signup")
    }

    static renderSignInForm (req, res) {
        res.render("signin")
    }

    static async signup(req, res) {
        try {
            const { email, password } = req.body;
            const user = await authService.signup(email, password);
            req.session.email = user.email;
            req.session.password = user.password // Store email in session
            res.redirect('/dashboard');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async signin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await authService.signin(email, password);
            req.session.email = user.email; 
            req.sesion.password = user.password;// Store email in session
            res.redirect('/dashboard');
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

    static async getDashboard(req, res) {
        try {
            const email = req.session.userId;
            const userKeys = await AccessKey.getKeysByUser(email);
            const allKeys = req.session.isAdmin ? await AccessKey.getAllKeys() : [];
            res.render('dashboard', { email, userKeys, allKeys, isAdmin: req.session.isAdmin });
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
