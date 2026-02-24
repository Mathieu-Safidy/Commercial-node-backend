const mongoose = require('mongoose');


//  nom: { bsonType : "string" },
const profilSchema = new mongoose.Schema({
    nom: { type: String, required: true }
})

module.exports = mongoose.model('profil', profilSchema, 'profil')