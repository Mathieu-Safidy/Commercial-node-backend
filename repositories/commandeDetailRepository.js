const CommandeDetail = require("../models/commandeDetailModel");
const produitModel = require('../models/produitModel');

class CommandeDetailRepository {
    async create(data) {
        return CommandeDetail.create(data);
    }

    async findAll() {
        return CommandeDetail.find()
           .populate('idCommande idProduit');
    }

    async findById(id) {
        return CommandeDetail.findById(id)
           .populate('idCommande idProduit');
    }
    async findByCommandeId(id) {
        return CommandeDetail.find({ idCommande: id })
            .populate('idProduit');
    }

    async findByCommande(idCommande) {
        return CommandeDetail.find({ idCommande })
           .populate('idCommande idProduit');
    }

    async update(id, data) {
        return CommandeDetail.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return CommandeDetail.findByIdAndDelete(id);
    }
    async findByProduit(idProduit) {
        return CommandeDetail.find({ idProduit })
           .populate('idCommande idProduit');
    }
}

module.exports = new CommandeDetailRepository();
