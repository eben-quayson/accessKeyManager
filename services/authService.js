const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const { addUser, findUserByEmail, findByEmail } = require('../models/User');

const signup = async (email, password) => {
    const existingUser = await addUser(email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Save user with verification token
    const newUser = await addUser(email, password, verificationToken);

    // Send verification email
    const verificationLink = `${process.env.BASE_URL}/verify/${verificationToken}`;
    console.log('verification link is', verificationLink)

    const subject = 'Email Verification';
    const html = `<p>Please verify your email by clicking the link: <a href="${verificationLink}">Verify Email</a></p>`;
    await sendEmail(email, subject, html);

    return newUser;
};

const signin = async (email, password) => {
    const user = await findByEmail(email);
    if (user) {
        return user
    }
    else {
        throw new Error('User not found')
    }
    
};



module.exports = { signup, signin };
