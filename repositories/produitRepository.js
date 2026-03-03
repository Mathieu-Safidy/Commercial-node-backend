const produitModel = require('../models/produitModel');
class ProduitRepository {
    static getProduitById = async (id) => {
        return await produitModel.findById(id);
    }
    static getAllProduits = async () => {
        return await produitModel.find().populate('idCategorie');
    }
    static saveProduit = async (produitData) => {
        const produit = new produitModel(produitData);
        return await produit.save();
    }
    static updateProduit = async (id, produitData) => {
        return await produitModel.findByIdAndUpdate(id, produitData, { new: true });
    }

    static getProduitsByBoutiqueId = async (idBoutique) => {
        return await produitModel.find({ idBoutique }).populate('idCategorie');
    }
}


module.exports = ProduitRepository;