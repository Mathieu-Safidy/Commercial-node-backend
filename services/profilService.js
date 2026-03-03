const profilModel = require('../models/profilModel');

class ProfilService {
    static async createProfil(data) {
        return await profilModel.create(data);
    }

    static async getAllProfils() {
        return await profilModel.find();
    }

    static async getProfilById(id) {
        return await profilModel.findById(id);
    }

    static async getProfilByName(name) {
        return await profilModel.findOne({ nom: name });
    }
}
module.exports = ProfilService;