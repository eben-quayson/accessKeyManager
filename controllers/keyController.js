const KeyService = require('../services/keyService');
const AccessKey = require('../models/AccessKey');

class KeyController {
    static async generateKey(req, res) {
       try {
            const userId = req.session.user.userId;
            const newKey = await AccessKey.createKey(userId);
             res.json({ key: newKey });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
 
    
    static async getUserKeys(req, res) {
        try {
            const keys = await KeyService.getUserKeys(req.session.userId);
            res.json({ keys });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getAllKeys(req, res) {
        try {
            const keys = await KeyService.getAllKeys();
            res.json({ keys });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = KeyController;
