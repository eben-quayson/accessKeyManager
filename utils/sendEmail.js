const nodemailer = require('nodemailer');
const { config } = require('../config/config');

async function sendEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.email.user,
            pass: config.email.pass
        }
    });

    let info = await transporter.sendMail({
        from: '"Key Manager" <your-email@gmail.com>',
        to,
        subject,
        text
    });

    console.log('Message sent: %s', info.messageId);
}

module.exports = sendEmail;
