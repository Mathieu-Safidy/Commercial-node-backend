const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const commandeSchema = new Schema(
    {
        idVenteAchat: {
            type: Schema.Types.ObjectId,
            ref: 'venteAchat',
            required: true
        },
        dateCommande: {
            type: Date,
            default: Date.now,
            required : true
        },
        idUser: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        status: {
            type: String,
            required: true
        },

    },
);

module.exports = mongoose.model('commande', commandeSchema, 'commande');
