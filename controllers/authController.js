const { signup, signin } = require('../services/authService');
const { verifyUser, findUserByVerificationToken } = require('../models/User');

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
            const user = await signup(email, password);
            req.session.userId = user.email;
            res.render('dashboard');
        } catch (err) {
            console.log('Error signing up new user', err)
        }
    }

    static async signin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await signin(email, password);
            if (user) {
                req.session.userId = user.email;
                console.log({ email: user.email, isAdmin: user.isAdmin, userKeys: user.keys, allKeys: user.allKeys })
                res.render('dashboard', { email: user.email, isAdmin: user.isAdmin, userKeys: user.keys, allKeys: user.allKeys });
            } else {
                res.render('/signin');
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
