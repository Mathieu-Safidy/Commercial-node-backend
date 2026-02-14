const panierService = require('../services/panierService');


const panierController = () => {
    const getAllPaniers = async (req, res) => {
        try {
            const paniers = await panierService().getAllPaniers();
            if (!paniers) {
                return res.status(404).json({ message: 'Aucun panier trouvé' });
            }
            res.status(200).json(paniers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    return {
        getAllPaniers
    }
}

module.exports = panierController;