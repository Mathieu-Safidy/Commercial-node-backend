const panierDetailRepository = require("../repositories/panierDetailRepository");

class PanierDetailService {

    async createPanierDetail(data) {
        return panierDetailRepository.create(data);
    }

    async getAllPanierDetails() {
        return panierDetailRepository.findAll();
    }

    async getPanierDetailById(id) {
        return panierDetailRepository.findById(id);
    }

    async getByPanierId(idPanier) {
        return panierDetailRepository.findByPanierId(idPanier);
    }

    async updatePanierDetail(id, data) {
        return panierDetailRepository.update(id, data);
    }

    async deletePanierDetail(id) {
        return panierDetailRepository.softDelete(id);
    }
}

module.exports = new PanierDetailService();
