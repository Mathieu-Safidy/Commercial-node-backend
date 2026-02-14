const mongoose = require('mongoose');

//  idPanier: { bsonType: "objectId" },
//         idProduit: { bsonType: "objectId" },
//         quantite: { bsonType: "int" },
//         deletedAt: { bsonType: ["date", "null"]},
//         createdAt: { bsonType: "date"}
const panierDetailSchema = new mongoose.Schema({
    idPanier: { type: mongoose.Schema.Types.ObjectId, ref: 'panier', required: true },
    idProduit: { type: mongoose.Schema.Types.ObjectId, ref: 'produit', required: true },
    quantite: { type: Number, required: true , default: 0 },
    deletedAt: { type: Date, required: false, default: null },
    createdAt: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('panierDetail', panierDetailSchema, 'panierDetail')