const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "quaysonebenezerawudzi@gmail.com",
    pass: "mirfbygosiztjiuh",
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
