const userModel = require('../models/user');
const crypto = require('crypto');

async function createUser(email, password, role) {
  return await userModel.createUser(email, password, role);
}

async function verifyUserEmail(email) {
  return await userModel.verifyUserEmail(email);
}

async function authenticateUser(email, password) {
  const user = await userModel.getUserByEmail(email);
  if (user && user.password === hashPassword(password)) {
    return user;
  }
  return null;
}

async function generateResetToken(email) {
  const token = crypto.randomBytes(20).toString('hex');
  await userModel.setResetToken(email, token);
  return token;
}

async function resetPassword(token, newPassword) {
  await userModel.resetPassword(token, newPassword);
}

module.exports = {
  createUser,
  verifyUserEmail,
  authenticateUser,
  generateResetToken,
  resetPassword,
};
