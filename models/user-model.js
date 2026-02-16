const mongoose = require('mongoose');

// email: { bsonType: "string" },
// username: { bsonType: "string" },
// password: { bsonType: "string" },
// idProfil: { bsonType: "objectId" }
const userShema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    idProfil: { type: mongoose.Schema.Types.ObjectId, ref: 'Profil', required: true }
})

module.exports = mongoose.model('user', userShema , 'user')