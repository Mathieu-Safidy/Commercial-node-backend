const produitModel = require('../models/produitModel');

class ProduitRepository {
    static getProduitById = async (id) => {
        return await produitModel.findById(id);
    }
    static getAllProduits = async () => {
        return await produitModel.find();
    }
}

module.exports = ProduitRepository;