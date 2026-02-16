const mongoose = require('mongoose');
//    nom: { bsonType : "string" },
//                 description: { bsonType : "string" },
//                 idBoutique: { bsonType: "objectId" },
//                 idCategorie: { bsonType: "objectId" },
//                 prixInitial: { bsonType: ["double","int"] },
//                 consultationCount: { bsonType: "int" },
//                 modifiedAt: { bsonType: ["date", "null"] },
//                 createdAt: { bsonType: "date" },
//                 deletedAt: { bsonType: ["date", "null"] },
//                 quantiteDisponible: { bsonType: "int" }
const produitSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    idBoutique: { type: mongoose.Schema.Types.ObjectId, ref: 'boutique', required: true },  
    boutique: { type: Object, ref: 'boutique' },
    idCategorie: { type: mongoose.Schema.Types.ObjectId, ref: 'categorie', required: true },
    prixInitial: { type: Number, required: true },
    consultationCount: { type: Number, required: true, default: 0 },
    modifiedAt: { type: Date, required: false, default: null },
    createdAt: { type: Date, required: true, default: Date.now },
    deletedAt: { type: Date, required: false, default: null },
    quantiteDisponible: { type: Number, required: true }
})
module.exports = mongoose.model('produit', produitSchema, 'produit')