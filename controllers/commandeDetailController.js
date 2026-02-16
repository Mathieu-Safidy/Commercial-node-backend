const commandeDetailService = require("../services/commandeDetailService");

class CommandeDetailController {
    async getDetails(req, res) {
        try {
            const details = await commandeDetailService.getAllDetails();
            res.json(details);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async getDetailById(req, res) {
        try {
            const detail = await commandeDetailService.getDetailById(req.params.id);
            res.json(detail);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }
    async getDetailByCommandeId(req, res) {
        try {
            const detail = await commandeDetailService.getDetailByCommandeId(req.params.id);
            res.json(detail);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: err.message});
        }
    }


    async createDetail(req, res) {
        try {
            const detail = await commandeDetailService.createDetail(req.body);
            res.status(201).json(detail);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    async updateDetail(req, res) {
        try {
            const updated = await commandeDetailService.updateDetail(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    async deleteDetail(req, res) {
        try {
            await commandeDetailService.deleteDetail(req.params.id);
            res.json({ message: "CommandeDetail supprimé" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new CommandeDetailController();
