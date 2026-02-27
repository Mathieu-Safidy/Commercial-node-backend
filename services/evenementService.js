const evenementRepo = require('../repositories/evenementRepository');

class EvenementService {

    async createEvenement(data) {
        return evenementRepo.create(data);
    }

    async getAllEvenements() {
        return evenementRepo.findAll();
    }

    async getEvenementById(id) {
        return evenementRepo.findById(id);
    }

    async getEvenementByBoutique(idBoutique) {
        return evenementRepo.findByBoutique(idBoutique);
    }

    async updateEvenement(id, data) {
        return evenementRepo.update(id, data);
    }

    async deleteEvenement(id) {
        return evenementRepo.delete(id);
    }

}

module.exports = new EvenementService();