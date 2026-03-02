const panierDetailRepository = require("../repositories/panierDetailRepository");

class PanierDetailService {

    static async createPanierDetail(data) {
        return panierDetailRepository.create(data);
    }

    static async getAllPanierDetails() {
        return panierDetailRepository.findAll();
    }

    static async getPanierDetailById(id) {
        return panierDetailRepository.findById(id);
    }

    static async getByPanierId(idPanier) {
        return panierDetailRepository.findByPanierId(idPanier);
    }

    static async updatePanierDetail(id, data) {
        return panierDetailRepository.update(id, data);
    }

    static async deletePanierDetail(id) {
        return panierDetailRepository.softDelete(id);
    }
}

module.exports = PanierDetailService;
