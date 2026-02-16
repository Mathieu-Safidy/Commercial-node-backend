const boutiqueModel = require('../models/boutiqueModel');
class BoutiqueRepository {
    static getBoutiqueById = async (id) => {
        return await boutiqueModel.findById(id);
    }
}

module.exports = BoutiqueRepository;