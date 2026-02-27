const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const evenementSchema = new Schema(
    {
        idBoutique: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'boutique',
            required: true
        },
        dateEvenement: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        typeEvenement: {
            type: String,
            required: true
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: { createdAt: true, updatedAt: false }
    }
);

module.exports = mongoose.model('evenement', evenementSchema, 'evenement');