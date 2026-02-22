const mongoose = require("mongoose");
const { Schema } = mongoose;

const boxSchema = new Schema({
    dimension: {
        type: Number,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    prixInitial: {
        type: Number,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model("box", boxSchema, "box");
