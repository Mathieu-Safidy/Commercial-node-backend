const mongoose = require('mongoose');
const venteAchatDetailModel = require('./venteAchatDetailModel');
//  dateTransaction: { bsonType: "date"}, 
// description: { bsonType: "string" }, 
// idUser: { bsonType: "objectId" },
// idBoutique: { bsonType: "objectId"}
const venteAchatSchema = new mongoose.Schema({
    dateTransaction: { type: Date, required: true },
    description: { type: String, required: true },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    idBoutique: { type: mongoose.Schema.Types.ObjectId, ref: 'boutique', required: true },
    details: [{ type: mongoose.Schema.Types.ObjectId, ref: 'venteAchatDetail' }]
})

module.exports = mongoose.model('venteAchat', venteAchatSchema)