const keyModel = require('../models/key');

async function getAllKeys() {
  return await keyModel.getAllKeys();
}

async function revokeKey(keyId) {
  return await keyModel.revokeKey(keyId);
}

async function getKeyStatus(email) {
  return await keyModel.getActiveKeyByEmail(email);
}

module.exports = {
  getAllKeys,
  revokeKey,
  getKeyStatus,
};
