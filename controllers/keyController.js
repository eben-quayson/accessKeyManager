const keyService = require('../services/keyService');

exports.getAllKeys = async (req, res) => {
  try {
    const keys = await keyService.getAllKeys();
    res.json(keys);
  } catch (error) {
    res.status(500).send('Error retrieving keys.');
  }
};

exports.revokeKey = async (req, res) => {
  const { keyId } = req.params;
  try {
    await keyService.revokeKey(keyId);
    res.send('Key revoked successfully.');
  } catch (error) {
    res.status(500).send('Error revoking key.');
  }
};

exports.getKeyStatus = async (req, res) => {
  const { email } = req.params;
  try {
    const key = await keyService.getKeyStatus(email);
    if (key) {
      res.status(200).json(key);
    } else {
      res.status(404).send('No active key found.');
    }
  } catch (error) {
    res.status(500).send('Error retrieving key status.');
  }
};
