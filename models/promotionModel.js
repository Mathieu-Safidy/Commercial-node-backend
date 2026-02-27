const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const promotionSchema = new Schema(
    {
        valeur: {
            type: Number
        },
        idEvenement: {
            type: Schema.Types.ObjectId,
            ref: 'evenement'
        },
        dateDebut: {
            type: Date
        },
        dateFin: {
            type: Date
        },
        idProduit: {
            type: Schema.Types.ObjectId,
            ref: 'produit'
        },
        reduction: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('promotion', promotionSchema, 'promotion');