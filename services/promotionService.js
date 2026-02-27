const promotionRepo = require('../repositories/promotionRepository');

class PromotionService {

    async createPromotion(data) {
        return promotionRepo.create(data);
    }

    async getAllPromotions() {
        return promotionRepo.findAll();
    }

    async getPromotionById(id) {
        return promotionRepo.findById(id);
    }

    async getPromotionByProduit(idProduit) {
        return promotionRepo.findByProduit(idProduit);
    }
    async getPromotionByProduitRecent(idProduit) {
        const promotions = await promotionRepo.findByProduit(idProduit);
        if (promotions.length === 0) {
            return null;
        }   
        return promotions[promotions.length - 1];
    }

    async updatePromotion(id, data) {
        return promotionRepo.update(id, data);
    }

    async deletePromotion(id) {
        return promotionRepo.delete(id);
    }
    async calculatePromotion(prix, reduction) {
        return prix - (prix * (reduction / 100));
    }

}

module.exports = new PromotionService();