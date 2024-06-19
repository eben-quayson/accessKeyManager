const authService = require('../services/authService');
const { sendVerificationEmail, sendResetPasswordEmail } = require('../utils/email');

exports.getSignIn = (req, res) => {
  res.render('../views/sign-in');
};

exports.getSignUp = (req, res) => {
  res.render('../views/sign-up');
};

exports.signUp = async (req, res) => {
  const name = { email, password, role } = req.body;
  try {
    await authService.createUser(email, password, role);
    const verificationUrl = `http://localhost:${process.env.PORT}/auth/verify?email=${email}`;
    await sendVerificationEmail(email, verificationUrl);
    res.status(201).send('User registered. Please check your email to verify your account.');
  } catch (error) {
    res.status(500).send('Error registering user.');
  }
};


exports.verifyEmail = async (req, res) => {
  const { email } = req.query;
  try {
    await authService.verifyUserEmail(email);
    res.send('Email verified successfully.');
  } catch (error) {
    res.status(500).send('Error verifying email.');
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authService.authenticateUser(email, password);
    if (!user) {
      return res.status(400).send('Invalid credentials.');
    }
    if (!user.verified) {
      return res.status(400).send('Please verify your email.');
    }
    req.session.userId = user.id;
    req.session.role = user.role;
    res.send('Logged in successfully.');
  } catch (error) {
    res.status(500).send('Error logging in.');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out.');
    }
    res.send('Logged out successfully.');
  });
};

exports.getForgotPassword = (req, res) => {
  res.render('forgot-password');
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const resetToken = await authService.generateResetToken(email);
    const resetUrl = `http://localhost:${process.env.PORT}/auth/reset-password?token=${resetToken}`;
    await sendResetPasswordEmail(email, resetUrl);
    res.send('Password reset email sent.');
  } catch (error) {
    res.status(500).send('Error sending password reset email.');
  }
};

exports.getResetPassword = (req, res) => {
  res.render('reset-password', { token: req.query.token });
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    await authService.resetPassword(token, password);
    res.send('Password reset successfully.');
  } catch (error) {
    res.status(500).send('Error resetting password.');
  }
};
