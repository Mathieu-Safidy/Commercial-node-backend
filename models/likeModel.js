const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    idPost: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('like', likeSchema, 'like')