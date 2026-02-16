const panierDetailModel = require("../models/panierDetailModel");
const panierModel = require("../models/panierModel");

class PanierRepository {
  static getAllPaniers = async () => {
    return await panierModel.find();
  };
  static getPanierByIdUser = async (idUser) => {
    return await panierModel.findOne({ idUser: idUser, deletedAt: null });
  }
  static getPanierActifById = async (id) => {
    return await panierModel.findOne({ _id: id, deletedAt: null , state: 'en_cours' });
  }
  static getPanierActifByIdUser = async (idUser) => {
    return await panierModel.findOne({ idUser: idUser, deletedAt: null , state: 'en_cours' });
  }
  
  static savePanier = async (panier) => {
    const newPanier = new panierModel(panier);
    return await newPanier.save();
  };
  static updatePanier = async (id, panier) => {
    return await panierModel.findByIdAndUpdate(id, panier, {
      new: true,
      runValidators: true,
    });
  }

};

module.exports = PanierRepository;
