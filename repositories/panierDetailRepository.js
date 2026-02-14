const panierDetailModel = require("../models/panierDetailModel");

const panierDetailRepository = () => {
  const getPanierDetailsByPanierId = async (panierId) => {
    return await panierDetailModel.find({ idPanier: panierId });
  };
  const savePanierDetail = async (panierDetail) => {
    const newPanierDetail = new panierDetailModel(panierDetail);
    return await newPanierDetail.save();
  };
  const updatePanierDetail = async (id, panierDetail) => {
    return await panierDetailModel.findByIdAndUpdate(id, panierDetail, {
      new: true,
      runValidators: true,
    });
  };

  return {
    getPanierDetailsByPanierId,
    savePanierDetail,
    updatePanierDetail,
  };
};

module.exports = panierDetailRepository;