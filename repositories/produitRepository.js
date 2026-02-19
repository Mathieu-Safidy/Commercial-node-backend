const produitModel = require('../models/produitModel');
const categorieModel = require('../models/categorie-modle');
class ProduitRepository {
    static getProduitById = async (id) => {
        return await produitModel.findById(id);
    }
    static getAllProduits = async () => {
        return await produitModel.find().populate('idCategorie');
    }
}

module.exports = ProduitRepository;