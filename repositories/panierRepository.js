const panierDetailModel = require("../models/panierDetailModel");
const panierModel = require("../models/panierModel");

const panierRepository = () => {
  const getAllPaniers = async () => {
    return await panierModel.find();
  };
  const getPanierByIdUser = async (idUser) => {
    return await panierModel.findOne({ idUser: idUser, deletedAt: null });
  }
  const savePanier = async (panier) => {
    const newPanier = new panierModel(panier);
    return await newPanier.save();
  };
  const updatePanier = async (id, panier) => {
    return await panierModel.findByIdAndUpdate(id, panier, {
      new: true,
      runValidators: true,
    });
  }

  return {
    getAllPaniers,
    getPanierByIdUser,
    savePanier,
    updatePanier,
  };
};

module.exports = panierRepository;
