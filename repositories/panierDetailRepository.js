const panierDetailModel = require("../models/panierDetailModel");

class PanierDetailRepository {
  static getPanierDetailsByPanierId = async (panierId) => {
    return await panierDetailModel.find({ idPanier: panierId });
  };
  static savePanierDetail = async (panierDetail) => {
    const newPanierDetail = new panierDetailModel(panierDetail);
    return await newPanierDetail.save();
  };
  static updatePanierDetail = async (id, panierDetail) => {
    return await panierDetailModel.findByIdAndUpdate(id, panierDetail, {
      new: true,
      runValidators: true,
    });
  };
  static deletePanierDetail = async (id) => {
    return await panierDetailModel.findByIdAndDelete(id);
  }
};

module.exports = PanierDetailRepository;