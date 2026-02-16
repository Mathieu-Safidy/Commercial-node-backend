const PanierService = require('../services/panierService');

class PanierController {
    static getAllPaniers = async (req, res) => {
        try {
            const paniers = await PanierService.getAllPaniers();
            if (!paniers) {
                return res.status(404).json({ message: 'Aucun panier trouvé' });
            }
            res.status(200).json(paniers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static getPanierActifByIdUser = async (req, res) => {
        try {
            const { idUser } = req.params;
            const panier = await PanierService.getPanierActifByIdUser(idUser);
            res.status(200).json(panier);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static createPanier = async (req, res) => {
        try {
            const panier = req.body;
            const newPanier = await PanierService.createPanier(panier);
            res.status(201).json(newPanier);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static addToPanier = async (req, res) => {
        try {
            const { idUser } = req.params;
            const detail = req.body;
            if (!detail.idProduit || !detail.quantite) {
                return res.status(400).json({ message: 'idProduit et quantite sont requis' });
            }
            if (detail.quantite <= 0) {
                return res.status(400).json({ message: 'La quantité doit être supérieure à zéro' });
            }
            const updatedPanier = await PanierService.addToPanier(idUser, detail);
            res.status(200).json(updatedPanier);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static addDetailToPanier = async (req, res) => {
        try {
            const { panierId } = req.params;
            const detail = req.body;
            if (!detail.idProduit || !detail.quantite) {
                return res.status(400).json({ message: 'idProduit et quantite sont requis' });
            }
            if (detail.quantite <= 0) {
                return res.status(400).json({ message: 'La quantité doit être supérieure à zéro' });
            }

            const updatedPanier = await PanierService.addDetailToPanier(panierId, detail);
            res.status(200).json(updatedPanier);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static deleteDetailFromPanier = async (req, res) => {
        try {
            const { idDetail } = req.params;
            const deletedDetail = await PanierService.deleteDetailFromPanier(idDetail);
            if (!deletedDetail) {
                return res.status(404).json({ message: 'Détail de panier non trouvé' });
            }
            res.status(200).json({ message: 'Détail de panier supprimé avec succès' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
     static modifyDetailFromPanier = async (req, res) => {
        try {
            const { idDetail } = req.params;
            const detail = req.body;
            const updatedDetail = await PanierService.modifyDetailFromPanier(idDetail, detail);
            if (!updatedDetail) {
                return res.status(404).json({ message: 'Détail de panier non trouvé' });
            }
            res.status(200).json(updatedDetail);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }   
    }

}

module.exports = PanierController;