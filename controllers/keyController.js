const KeyService = require('../services/keyService');
const AccessKey = require('../models/AccessKey');
const User = require('../models/User');

class KeyController {
    static async generateKeys(req, res) {
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

    static async getKeysByEmail(req, res) {
        try {
            const { email } = req.body; 
            const user = await User.findUserByEmail(email);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const keys = await AccessKey.getKeysByUser(user.id);
            res.status(200).json({ keys });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async generateKey(req, res) {
        try {
            const email = req.session.email;
            if (!email) {
                return res.status(400).json({ error: 'User not authenticated' });
            }

            const key = await AccessKey.createKey(email);
            res.status(200).json({ key });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getKeys(req, res) {
        try {
            const email = req.session.email;
            if (!email) {
                return res.status(400).json({ error: 'User not authenticated' });
            }

            const keys = await AccessKey.getKeysByEmail(email);
            res.status(200).json({ keys });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getAllKeys(req, res) {
        try {
            const keys = await AccessKey.getAllKeys();
            res.status(200).json({ keys });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = KeyController;
