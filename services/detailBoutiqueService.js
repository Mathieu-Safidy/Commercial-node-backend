const detailBoutiqueRepo = require('../repositories/detailBoutiqueRepository');

class DetailBoutiqueService {

    async createDetail(data) {
        return detailBoutiqueRepo.create(data);
    }

    async getAllDetails() {
        return detailBoutiqueRepo.findAll();
    }

    async getDetailById(id) {
        return detailBoutiqueRepo.findById(id);
    }

    async getDetailsByBoutiqueId(idBoutique) {
        return detailBoutiqueRepo.findOneByBoutiqueId(idBoutique);
    }

    async updateDetail(id, data) {
        return detailBoutiqueRepo.update(id, data);
    }

    async deleteDetail(id) {
        return detailBoutiqueRepo.delete(id);
    }
}

module.exports = new DetailBoutiqueService();