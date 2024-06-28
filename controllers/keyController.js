const KeyService = require('../services/keyService');

class KeyController {
    static async generateKey(req, res) {
        try {
            const key = await KeyService.generateKey(req.session.userId);
            res.json({ key });
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
