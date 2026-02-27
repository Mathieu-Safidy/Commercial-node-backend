const commandeDetailRepo = require('../repositories/commandeDetailRepository');

class CommandeDetailService {
    async createDetail(data) {
        return commandeDetailRepo.create(data);
    }

    async getAllDetails() {
        return commandeDetailRepo.findAll();
    }

    async getDetailById(id) {
        return commandeDetailRepo.findById(id);
    }
    async getDetailByCommandeId(id) {
        return commandeDetailRepo.findByCommandeId(id);
    }

    async getDetailsByCommande(idCommande) {
        return commandeDetailRepo.findByCommande(idCommande);
    }

    async updateDetail(id, data) {
        return commandeDetailRepo.update(id, data);
    }

    async deleteDetail(id) {
        return commandeDetailRepo.delete(id);
    }
}

module.exports = new CommandeDetailService();
