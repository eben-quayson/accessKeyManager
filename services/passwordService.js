//
const PasswordReset = require('../models/passwordReset');
const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

class PasswordService {
    static async requestPasswordReset(email) {
        const token = crypto.randomBytes(20).toString('hex');
        const expiration = Date.now() + 3600000; // 1 hour
        await PasswordReset.createResetRequest(email, token, expiration);
        const resetLink = `http://localhost:3000/password/reset/${token}`;
        await sendEmail(email, 'Password Reset', `Click here to reset your password: ${resetLink}`);
    }

    static async resetPassword(token, newPassword) {
        const resetRequest = await PasswordReset.findResetRequestByToken(token);
        if (resetRequest && resetRequest.expiration > Date.now()) {
            const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
            await User.updatePasswordByEmail(resetRequest.email, hashedPassword);
            await PasswordReset.deleteResetRequestByToken(token);
            return true;
        }
        return false;
    }
}

module.exports = PasswordService;
