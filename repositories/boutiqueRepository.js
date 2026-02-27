const boutiqueModel = require('../models/boutiqueModel');
class BoutiqueRepository {
    static getBoutiqueById = async (id) => {
        return await boutiqueModel.findById(id);
    }

    static create = async (data) => {
        return await boutiqueModel.create(data);
    }

    static findAll = async () => {
        return await boutiqueModel.find()
            // .populate('idUser')
            // .populate('idCategorie');
    }

    static findById = async (id) => {
        return await boutiqueModel.findById(id)
            // .populate('idUser')
            // .populate('idCategorie');
    }

    static findByUserId = async (idUser) => {
        return await boutiqueModel.find({ idUser })
            // .populate('idUser')
            // .populate('idCategorie');
    }

    static findByCategorieId = async (idCategorie) => {
        return await boutiqueModel.find({ idCategorie })
            // .populate('idUser')
            // .populate('idCategorie');
    }

    static update = async (id, data) => {
        return await boutiqueModel.findByIdAndUpdate(id, data, { new: true });
    }

    static delete = async (id) => {
        return await boutiqueModel.findByIdAndDelete(id);
    }

}

module.exports = BoutiqueRepository;