const commandeRepo = require('../repositories/commandeRepositorie');
const commandeDetailRepo = require('../repositories/commandeDetailRepositorie');
const commandeDetailService = require('../services/commandeDetailService');
const panierService = require('../services/panierService') ;
const panierDetailService = require('../services/panierDetailService');
const {Schema} = require("mongoose");

class CommandeService {
    async createCommande(data) {
        return commandeRepo.create(data);
    }

    async _calculateItemsAndTotal(cmd) {
        const details = await commandeDetailService.getDetailsByCommande(cmd._id);

        const items = details.reduce((sum, d) => sum + d.quantite, 0);
        const total = details.reduce((sum, d) => sum + (d.idProduit?.prixInitial || 0) * d.quantite, 0);

        return { items, total };
    }

    async getAllCommandes() {
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
    async getCommandeById(id) {
        return commandeRepo.findById(id);
    }

    async updateCommande(id, data) {
        return commandeRepo.update(id, data);
    }

    async deleteCommande(id) {
        return commandeRepo.delete(id);
    }

    async addPanierCommande(idUser, idVenteAchat) {

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
            await commandeDetailRepo.create({
                idCommande: commande._id,
                idProduit: detail.idProduit,
                quantite: detail.quantite,
                createdAt: detail.createdAt
            });
        }
        // await panierService.updatePanier(panier._id, {
        //     state: "valide"
        // });

        return commande;
    }
}

module.exports = new CommandeService();
