const db = require('../config/db');
const venteAchatModel = require('../models/venteAchatModel');

const venteAchatRepository = () => {

    const getAll = async () => {
        return await venteAchatModel.find()
    }
    const getById = async (id) => {
        return await venteAchatModel.findById(id);
    }
    const save = async (venteAchat) => {
        const newVenteAchat = new venteAchatModel(venteAchat);
        return await newVenteAchat.save();
    }
    const update = async (id, venteAchat) => {
        return await venteAchatModel.findByIdAndUpdate(id, venteAchat, { new: true });
    }
    const deleteById = async (id) => {
        return await venteAchatModel.findByIdAndDelete(id);
    }

    return {
        getAll,
        getById,
        save,
        update,
        deleteById
    }
}

module.exports = venteAchatRepository;