const commandeRepo = require('../repositories/commandeRepository');
const commandeDetailRepo = require('../repositories/commandeDetailRepository');
const commandeDetailService = require('../services/commandeDetailService');
const panierService = require('../services/panierService') ;
const panierDetailService = require('../services/panierDetailService');
const {Schema} = require("mongoose");
const promotionService = require('./promotionService');

class CommandeService {
    static async createCommande(data) {
        return commandeRepo.create(data);
    }

   static async _calculateItemsAndTotal(cmd) {
        const details = await commandeDetailService.getDetailsByCommande(cmd._id);

        const items = details.reduce((sum, d) => sum + d.quantite, 0);

        let total = 0;

        for (const d of details) {
            let promo = await promotionService.getPromotionByProduitRecent(d.idProduit);

            let prixFinal = promo ? promo.valeur : d.idProduit.prixInitial;

            total += prixFinal * d.quantite;
        }

        return { items, total };
    }

    static async getAllCommandes() {
        const commandes = await commandeRepo.findAll(); // idUser et idVenteAchat

        const orders = await Promise.all(
            commandes.map(async (cmd) => {
                const { items, total } = await this._calculateItemsAndTotal(cmd);
                return {
                    id: cmd._id,
                    customer: cmd.idUser?.username || 'Client inconnu',
                    status: cmd.status,
                    time: new Date(cmd.dateCommande).toLocaleTimeString(),
                    items,
                    total: total
                };
            })
        );
        return orders;
    }
    static async getCommandeById(id) {
        return commandeRepo.findById(id);
    }

    static async updateCommande(id, data) {
        return commandeRepo.update(id, data);
    }

    static async deleteCommande(id) {
        return commandeRepo.delete(id);
    }

    static async addPanierCommande(idUser, idVenteAchat) {
        
        const panierUser = await panierService.getPanierActifByIdUser(idUser);

        if (!panierUser) {
            throw new Error("Aucun panier actif trouvé");
        }

        const panierDetails = await panierDetailService.getByPanierId(panierUser._id);
        if (!panierDetails.length) {
            throw new Error("Panier vide");
        }

        const commande = await commandeRepo.create({
            idVenteAchat: idVenteAchat,
            dateCommande: panierUser.createdAt,
            idUser: idUser,
            status: "en_cours"
        });
              
        for (const detail of panierDetails) {
            let prixPromo = promotionService.getPromotionByProduitRecent(detail.idProduit);
            let prixFinal = prixPromo ? prixPromo.valeur : detail.idProduit.prixInitial;
         
            await commandeDetailRepo.create({
                idCommande: commande._id,
                idProduit: detail.idProduit,
                quantite: detail.quantite,

            });
        }
        
        await panierService.validerPanier(panierUser._id);

        return commande;


    }
}

module.exports = CommandeService;
