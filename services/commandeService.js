const commandeRepo = require('../repositories/commandeRepositorie');
const commandeDetailService = require('../services/commandeDetailService');

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

    async totalPrixCommande() {

    }
}

module.exports = new CommandeService();
