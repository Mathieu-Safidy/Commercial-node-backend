const boutiqueRepo = require('../repositories/boutiqueRepository');

class BoutiqueService {

    async createBoutique(data) {
        return boutiqueRepo.create(data);
    }

    async getAllBoutiques() {
        return boutiqueRepo.findAll();
    }

    async getBoutiqueById(id) {
        return boutiqueRepo.findById(id);
    }

    async getBoutiquesByUserId(idUser) {
        console.log("idUser in service : ", idUser); 
        return boutiqueRepo.findByUserId(idUser);
    }

    async getBoutiquesByCategorieId(idCategorie) {
        return boutiqueRepo.findByCategorieId(idCategorie);
    }

    async updateBoutique(id, data) {
        return boutiqueRepo.update(id, data);
    }

    async deleteBoutique(id) {
        return boutiqueRepo.delete(id);
    }
}

module.exports = new BoutiqueService();