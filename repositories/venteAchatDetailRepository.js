const venteAchatDetailModel = require('../models/venteAchatDetailModel');

const venteAchatDetailRepository = () => {
    const getAllVenteAchatDetailsByVenteAchat = async (idVenteAchat) => {
        return await venteAchatDetailModel.find({ idVenteAchat: idVenteAchat });
    }

    const saveVenteAchatDetail = async (venteAchatDetail) => {
        const newVenteAchatDetail = new venteAchatDetailModel(venteAchatDetail);
        return await newVenteAchatDetail.save();
    }

    const updateVenteAchatDetail = async (id, venteAchatDetail) => {
        return await venteAchatDetailModel.findByIdAndUpdate(id, venteAchatDetail, { new: true, runValidators: true });
    }


    return {
        getAllVenteAchatDetailsByVenteAchat,
        saveVenteAchatDetail,
        updateVenteAchatDetail
    }
}

module.exports = venteAchatDetailRepository;