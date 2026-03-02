const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
    idPost: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    contenu: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    modifiedAt: { type: Date, default: null }
})

module.exports = mongoose.model('commentaire', commentaireSchema, 'commentaire')