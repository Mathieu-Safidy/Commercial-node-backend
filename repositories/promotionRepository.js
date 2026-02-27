const Promotion = require('../models/promotionModel');

class PromotionRepository {

    async create(data) {
        return Promotion.create(data);
    }

    async findAll() {
        return Promotion.find()
            .populate('idEvenement')
            .populate('idProduit');
    }

    async findById(id) {
        return Promotion.findById(id)
            .populate('idEvenement')
            .populate('idProduit');
    }

    async findByProduit(idProduit) {
        return Promotion.find({ idProduit })
        //    .populate('idEvenement')
            .populate('idProduit');
    }

    async update(id, data) {
        return Promotion.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return Promotion.findByIdAndDelete(id);
    }
}

module.exports = new PromotionRepository();