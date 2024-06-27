const User = require('../models/User');
const crypto = require('crypto');

class AuthService {
    static async signup(email, password) {
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        return await User.createUser(email, hashedPassword);
    }

    static async signin(email, password) {
        const user = await User.getUserByEmail(email);
        if (user) {
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
            if (hashedPassword === user.password) {
                return user;
            }
        }
        return null;
    }
    
}

module.exports = AuthService;
