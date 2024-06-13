const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendVerificationEmail(email, verificationUrl) {
  await transporter.sendMail({
    to: email,
    subject: 'Verify Your Email',
    html: `<a href="${verificationUrl}">Verify your email</a>`,
  });
}

async function sendResetPasswordEmail(email, resetUrl) {
  await transporter.sendMail({
    to: email,
    subject: 'Reset Password',
    html: `<a href="${resetUrl}">Reset your password</a>`,
  });
}

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
};
