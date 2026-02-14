const mongoose = require('mongoose');
//  idVenteAchat: { bsonType: "objectId" }, 
//         idProduit: { bsonType: "objectId" },
//         deletedAt: { bsonType: ["date", "null"]}, 
//         createdAt: { bsonType: "date" }, 
//         prixFinal: { bsonType: ["double","int"] }, 
//         quantite: { bsonType: "int"  }
const venteAchatDetailSchema = new mongoose.Schema({
    idVenteAchat: { type: mongoose.Schema.Types.ObjectId, ref: 'venteAchat', required: true },
    idProduit: { type: mongoose.Schema.Types.ObjectId, ref: 'produit', required: true },
    deletedAt: { type: Date, required: false, default: null },
    createdAt: { type: Date, required: true, default: Date.now },
    prixFinal: { type: Number, required: true },
    quantite: { type: Number, required: true }
})

module.exports = mongoose.model('venteAchatDetail', venteAchatDetailSchema)