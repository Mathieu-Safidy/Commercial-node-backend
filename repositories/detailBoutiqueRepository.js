const DetailBoutique = require('../models/detailBoutiqueModel');

class DetailBoutiqueRepository {

    async create(data) {
        return DetailBoutique.create(data);
    }

    async findAll() {
        return DetailBoutique.find()
            .populate('idBoutique');
    }

    async findById(id) {
        return DetailBoutique.findById(id)
            .populate('idBoutique');
    }

    async findByBoutiqueId(idBoutique) {
        return DetailBoutique.find({ idBoutique })
            .populate('idBoutique');
    }
    // detailBoutiqueRepo.ts
    async findOneByBoutiqueId(idBoutique) {
        return DetailBoutique.findOne({ idBoutique })
            .populate('idBoutique');// model est ton vrai Mongoose Model
    }

    async update(id, data) {
        return DetailBoutique.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return DetailBoutique.findByIdAndDelete(id);
    }
}

module.exports = new DetailBoutiqueRepository();