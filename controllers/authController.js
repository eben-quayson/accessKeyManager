const AuthService = require('../services/authService');
const KeyService = require('../services/keyService');

class AuthController {
    static async signup(req, res) {
        try {
            const { email, password } = req.body;
            await AuthService.signup(email, password);
            res.redirect('/auth/signin');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async signin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await AuthService.signin(email, password);
            if (user) {
                req.session.userId = user.id;
                req.session.isAdmin = user.is_admin;
                res.redirect('/dashboard');
            } else {
                const error = err.message;
                res.render('signin', {error});
                //res.redirect('/auth/signin');
            }
        } catch (err) {
            //res.status(500).json({ error: err.message });
            const error =err.message;
            res.render('signin', {error});
        }
    }

    static signout(req, res) {
        req.session.destroy(() => {
            res.redirect('/auth/signin');
        });
    }

    static async verifyEmail(req, res) {
        try {
            const { token } = req.params;
            const success = await AuthService.verifyEmail(token);
            if (success) {
                res.redirect('/auth/signin');
            } else {
                res.status(400).json({ error: 'Invalid or expired token' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async dashboard(req, res) {
        try {
            const userKeys = await KeyService.getUserKeys(req.session.userId);
            let allKeys = [];
            if (req.session.isAdmin) {
                allKeys = await KeyService.getAllKeys();
            }
            res.render('dashboard', {
                email: req.session.userId,
                userKeys,
                allKeys,
                isAdmin: req.session.isAdmin
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = AuthController;
