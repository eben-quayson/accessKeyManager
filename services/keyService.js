const AccessKey = require('../models/AccessKey');

class KeyService {
    static async generateKey(userId) {
        const key = await AccessKey.createKey(userId);
        return key;
    }

    static async getUserKeys(userId) {
        const keys = await AccessKey.getKeysByUser(userId);
        return keys;
    }

    static async getAllKeys() {
        const keys = await AccessKey.getAllKeys();
        return keys;
    }
}

module.exports = KeyService;
