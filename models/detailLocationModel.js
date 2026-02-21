const mongoose = require("mongoose");
const { Schema } = mongoose;

const detailLocationSchema = new Schema({
    idLocation: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "location"
    },
    idBox: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "box"
    },
    dateDebut: {
        type: Date,
        required: true
    },
    dateFin: {
        type: Date,
    },
    prixFinal: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["en attente", "valide", "annulee"],
        default: "en attente",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('detaiLocation', detailLocationSchema, 'detailLocation')