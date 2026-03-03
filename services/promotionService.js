const promotionRepo = require('../repositories/promotionRepository');

class PromotionService {

    static async createPromotion(data) {
        return promotionRepo.create(data);
    }

    static async getAllPromotions() {
        return promotionRepo.findAll();
    }

    static async getPromotionById(id) {
        return promotionRepo.findById(id);
    }

    static async getPromotionByProduit(idProduit) {
        return promotionRepo.findByProduit(idProduit);
    }
    static async getPromotionByProduitRecent(idProduit) {
        const promotions = await promotionRepo.findByProduit(idProduit);
        if (promotions.length === 0) {
            return null;
        }   
        return promotions[promotions.length - 1];
    }

    static async updatePromotion(id, data) {
        return promotionRepo.update(id, data);
    }

    static async deletePromotion(id) {
        return promotionRepo.delete(id);
    }
    static async calculatePromotion(prix, reduction) {
        return prix - (prix * (reduction / 100));
    }

}

module.exports = PromotionService;