const profilModel = require("../models/profilModel");

class ProfilRepository {
    static async findByName(name) {
        return await profilModel.findOne({ nom: name });
    }
}

module.exports = ProfilRepository;