const likeModel = require('../models/likeModel');
class LikeService {

    static async createLike(idPost, idUser) {
        return await likeModel.create({ idPost, idUser });
    }

    static async getLikesByPostId(idPost) {
        return await likeModel.find({ idPost }).populate('idUser');
    }

    static async deleteLike(idPost, idUser) {
        return await likeModel.findOneAndDelete({ idPost, idUser });
    }
}

module.exports = LikeService;