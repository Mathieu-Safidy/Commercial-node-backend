const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const locationShema = new Schema({
    note: {
        type: String,
    },
    dateLocation: {
        type: Date,
        default: null,
        required : true
    },
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }
});

module.exports = mongoose.model('location', locationShema, 'location')