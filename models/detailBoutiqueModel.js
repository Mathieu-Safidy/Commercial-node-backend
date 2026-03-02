const mongoose = require('mongoose');

const detailBoutiqueSchema = new mongoose.Schema({
    idBoutique: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'boutique',
        required: true
    },

    description: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },

    telephone: {
        type: String,
        required: true
    },

    descriptionHoraire: {
        type: String,
        required: true
    },

    noteMoyen: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    status: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model('detailBoutique', detailBoutiqueSchema, 'detailBoutique');