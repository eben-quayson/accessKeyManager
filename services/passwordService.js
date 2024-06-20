const PasswordReset = require('../models/passwordReset');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

class PasswordService {
    static async requestPasswordReset(email) {
        const resetRequest = await PasswordReset.createResetRequest(email);
        const resetLink = `http://localhost:3000/password/reset/${resetRequest.token}`;
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
