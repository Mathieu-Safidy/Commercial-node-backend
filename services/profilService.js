const profilModel = require('../models/profilModel');

class ProfilService {
    async createProfil(data) {
        return await profilModel.create(data);
    }

    async getAllProfils() {
        return await profilModel.find();
    }

    async getProfilById(id) {
        return await profilModel.findById(id);
    }

    async getProfilByName(name) {
        return await profilModel.findOne({ nom: name });
    }
}
module.exports = new ProfilService();