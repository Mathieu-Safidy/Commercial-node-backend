const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    modifiedAt: { type: Date, default: null },
    // images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'postImages', required: false }]
});

postSchema.virtual('images', {
  ref: 'postImages',
  localField: '_id',
  foreignField: 'idPost'
});

postSchema.virtual('comment', {
    ref: 'commentaire',
    localField: '_id',
    foreignField: 'idPost'
});

postSchema.virtual('likes', {
    ref: 'like',
    localField: '_id',
    foreignField: 'idPost'
});


postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('post', postSchema, 'post')