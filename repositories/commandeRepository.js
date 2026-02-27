const Commande = require("../models/commandeModel");
const User = require("../models/userModel");

class CommandeRepository {
    async create(data) {
        return Commande.create(data);
    }

    async findAll() {
        return Commande.find().populate('idUser');
    }

    async findById(id) {
        return Commande.findById(id).populate('idUser');
    }

    async update(id, data) {
        return Commande.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return Commande.findByIdAndDelete(id);
    }
}

module.exports = new CommandeRepository();
