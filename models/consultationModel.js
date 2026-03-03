const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const consultationSchema = new Schema(
    {
        idProduit: {
            type: Schema.Types.ObjectId,
            ref: 'produit',
            required: true
        },
        moisConsultation: {
            type: Number,
            required: true
        },
        anneeConsultation: {
            type: Number,
            required: true
        },
        nombreConsultation: {
            type: Number,
            default: 0
        }
    },
);

module.exports = mongoose.model('consultation', consultationSchema, 'consultation');
