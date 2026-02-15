const ProduitService = require("../services/produitService");

class ProduitController {
    static getAllProduits = async (req, res) => {
        try {
            const produits = await ProduitService.getAllProduits();
             res.status(200).json(produits);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ProduitController;