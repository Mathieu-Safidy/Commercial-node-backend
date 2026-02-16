const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const commandeDetailSchema = new Schema({
    idCommande: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "commande"
    },
    idProduit: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "produit"
    },
    quantite: {
        type: Number,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null,
        required : false
    },
    createdAt: {
        type: Date,
        default: Date.now ,
        required : true
    }
});

module.exports = mongoose.model('commandeDetail', commandeDetailSchema, 'commandeDetail')