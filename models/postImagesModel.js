const mongoose = require('mongoose');

const postImagesSchema = new mongoose.Schema({
    link: { type: String, required: true },
    idPost: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    modifiedAt: { type: Date, default: null }
})

module.exports = mongoose.model('postImages', postImagesSchema, 'postImages')