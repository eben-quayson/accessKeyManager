const PasswordService = require('../services/passwordService');

class PasswordController {
    static async requestReset(req, res) {
        try {
            const { email } = req.body;
            await PasswordService.requestPasswordReset(email);
            res.json({ message: 'Password reset link sent to your email' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async resetPassword(req, res) {
        try {
            const { token } = req.params;
            const { password } = req.body;
            const success = await PasswordService.resetPassword(token, password);
            if (success) {
                res.json({ message: 'Password reset successful' });
            } else {
                res.status(400).json({ error: 'Invalid or expired token' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static getResetForm(req, res) {
        const { token } = req.params;
        res.render('resetPassword', { token });
    }

    static getRequestForm(req, res) {
        res.render('resetPasswordRequest');
    }
}

module.exports = PasswordController;
