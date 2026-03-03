const likeModel = require('../models/likeModel');

class LikeRepository {
    static async createLike(idPost, idUser) {
        const like = new likeModel({ idPost, idUser });
        return await like.save();
    }

    static async getLikesByPostId(idPost) {
        return await likeModel.find({ idPost }).populate('idUser');
    }

    static async deleteLike(idPost, idUser) {
        return await likeModel.findOneAndDelete({ idPost, idUser });
    }
}

module.exports = LikeRepository;