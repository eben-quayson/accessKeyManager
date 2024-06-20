const AccessKey = require('../models/AccessKey');

class KeyService {
    static async createKey(schoolId) {
        return await AccessKey.createKey(schoolId);
    }

    static async getAllKeys() {
        const result = await AccessKey.getKeys();
        return result;
    }
}

module.exports = KeyService;
