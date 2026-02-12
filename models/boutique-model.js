const mongoose = require('mongoose');

// nom: { bsonType : "string" },
// description: { bsonType : "string" },
// idUser: { bsonType: "objectId" },
// idCategorie: { bsonType: "objectId" },
// createdAt: { bsonType: "date" },
// deletedAt: { bsonType: "date" }
const boutiqueShema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    idCategorie: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie', required: true },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
})

module.exports = mongoose.model('Boutique', boutiqueShema)