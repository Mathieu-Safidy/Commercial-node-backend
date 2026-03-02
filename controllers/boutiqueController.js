const boutiqueService = require("../services/boutiqueService");

class BoutiqueController {
    static async getBoutiqueById(req, res) {
        try {
            const boutique = await boutiqueService.getBoutiqueById(req.params.id);
            res.json(boutique);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    static async getAllBoutiques(req, res) {
        try {
            const boutiques = await boutiqueService.getAllBoutiques();
            res.json(boutiques);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    static async getBoutiquesByUserId(req, res) {
        try {
            const { userId } = req.params;
            const boutiques = await boutiqueService.getBoutiquesByUserId(userId);
            res.status(200).json(boutiques);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

}

module.exports = BoutiqueController;