const commandeDetailRepo = require('../repositories/commandeDetailRepository');
const promotionService = require('./promotionService');

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
    // async getDetailByCommandeId(id) {
    //     return commandeDetailRepo.findByCommandeId(id);
    // }
    async getDetailByCommandeId(id) {
        let details = await commandeDetailRepo.findByCommandeId(id);
        let detailsWithPromo = [];
        for (let detail of details) {
            let promotion = await promotionService.getPromotionByProduitRecent(detail.idProduit);
            let prom = promotion ? (promotion.reduction ? promotion.reduction : 0) : 0;
            let valeurpromotion = promotion ? promotion.valeur : detail.idProduit.prixInitial;
            detail = detail.toObject();
            detailsWithPromo.push({
                ...detail,
                reduction: prom,
                prixPromotionnel: valeurpromotion
            })
        }
        console.log('detail ', detailsWithPromo);
        return detailsWithPromo;

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
    async getDetailsByidProduit(idProduit) {
        return commandeDetailRepo.findByProduit(idProduit);
    }
}

module.exports = new CommandeDetailService();
