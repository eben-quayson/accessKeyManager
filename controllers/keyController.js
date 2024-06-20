const KeyService = require('../services/keyService');

class KeyController {
    static async createKey(req, res) {
        try {
            const { schoolId } = req.body;
            const key = await KeyService.createKey(schoolId);
            res.redirect('/keys');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getKeys(req, res) {
        try {
            const keys = await KeyService.getAllKeys();
            res.render('accesskeys', { keys });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = KeyController;
