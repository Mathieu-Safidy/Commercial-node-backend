const StockService = require("../services/stockService");

class StockController {
    static addStock = async (req, res) => {
        try {
            const { idProduit, quantite } = req.body;
            await StockService.transactionStock(idProduit, quantite, "in");
            res.status(200).json({ message: "Stock mis à jour avec succès" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static removeStock = async (req, res) => {
        try {
            const { idProduit, quantite } = req.body;
            await StockService.transactionStock(idProduit, quantite, "out");
            res.status(200).json({ message: "Stock mis à jour avec succès" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static adjustStock = async (req, res) => {
        try {
            const { idProduit, quantite, entree, sortie } = req.body;
            await StockService.transactionStock(idProduit, quantite, "adjustment", entree, sortie);
            res.status(200).json({ message: "Stock mis à jour avec succès" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = StockController;