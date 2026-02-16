const commandeService = require("../services/commandeService");

class CommandeController {
    async getCommandes(req, res) {
        try {
            const commandes = await commandeService.getAllCommandes(); // tu peux ajouter items/total si nécessaire
            res.json(commandes);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async getCommandeById(req, res) {
        try {
            const commande = await commandeService.getCommandeById(req.params.id);
            res.json(commande);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async createCommande(req, res) {
        try {
            const commande = await commandeService.createCommande(req.body);
            res.status(201).json(commande);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    async updateCommande(req, res) {
        try {
            const updated = await commandeService.updateCommande(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    async deleteCommande(req, res) {
        try {
            await commandeService.deleteCommande(req.params.id);
            res.json({ message: "Commande supprimée" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new CommandeController();
