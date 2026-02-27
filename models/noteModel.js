const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    idProduit: { type: mongoose.Schema.Types.ObjectId, ref: 'produit', required: true },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    nombreEtoiles: { type: Number, required: true, default: 0 },
    commentaire: { type: String, required: false, default: '' },
    idBoutique: { type: mongoose.Schema.Types.ObjectId, ref: 'boutique', required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    deletedAt: { type: Date, required: false, default: null },
})
noteSchema.index({ idProduit: 1, idUser: 1 }, { unique: true });

module.exports = mongoose.model('note', noteSchema, 'note')