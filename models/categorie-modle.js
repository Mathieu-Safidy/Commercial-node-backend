const mongoose = require('mongoose');

// nom: { bsonType : "string" },
// description: { bsonType : "string" },
// createdAt: { bsonType: "date" },
// deletedAt: { bsonType: "date" }
const categorieSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
})

module.exports = mongoose.model('Categorie', categorieSchema)