const ProduitService = require("../services/produitService");
const promotionService = require("../services/promotionService");

class PromotionController {

    async getPromotions(req, res) {
        try {
            const promotions = await promotionService.getAllPromotions();
            res.json(promotions);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async getPromotionById(req, res) {
        try {
            const promotion = await promotionService.getPromotionById(req.params.id);
            res.json(promotion);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async getPromotionByProduit(req, res) {
        try {

            const { idProduit } = req.params;
            const promotions = await promotionService.getPromotionByProduit(idProduit);

            res.json(promotions);

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async createPromotion(req, res) {
        try {
            const promo = req.body;
            const prixInitial = await ProduitService.getProduitById(promo.idProduit) ;
            const valeurFinale = await promotionService.calculatePromotion(
                prixInitial.prixInitial,
                promo.reduction
            );
            promo.valeur = valeurFinale;
            const promotion = await promotionService.createPromotion(promo);
            res.status(201).json({
                message: "Promotion créée avec succès",
                promotion
            });

        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    async updatePromotion(req, res) {
        try {

            const updated = await promotionService.updatePromotion(
                req.params.id,
                req.body
            );

            res.json({
                message: "Promotion mise à jour",
                promotion: updated
            });

        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    async deletePromotion(req, res) {
        try {

            await promotionService.deletePromotion(req.params.id);

            res.json({
                message: "Promotion supprimée"
            });

        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

}

module.exports = new PromotionController();