const Evenement = require('../models/evenementModel');

class EvenementRepository {

    async create(data) {
        return Evenement.create(data);
    }

    async findAll() {
        return Evenement.find({ deletedAt: null })
            .populate('idBoutique');
    }

    async findById(id) {
        return Evenement.findOne({
            _id: id,
            deletedAt: null
        }).populate('idBoutique');
    }

    async findByBoutique(idBoutique) {
        return Evenement.find({
            idBoutique: idBoutique,
            deletedAt: null
        }).populate('idBoutique');
    }

    async update(id, data) {
        return Evenement.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return Evenement.findByIdAndUpdate(
            id,
            { deletedAt: new Date() },
            { new: true }
        );
    }
}

module.exports = new EvenementRepository();