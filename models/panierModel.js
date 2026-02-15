const mongoose = require('mongoose');

// idUser: { bsonType: "objectId" },
// createdAt: { bsonType: "date" },
// deletedAt: { bsonType: ["date", "null"] }
const panierSchema = new mongoose.Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    deletedAt: { type: Date, required: false, default: null },
    state: { type: String, required: true, default: 'en_cours' },
    details: [{ type: Object , ref: 'panierDetail' }]
})

module.exports = mongoose.model('panier', panierSchema, 'panier')