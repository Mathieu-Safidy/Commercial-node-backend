const likeService = require("../services/likeService");

class LikeController {
  static async createLike(req, res) {
    try {
      const { idPost, idUser } = req.body;
      const like = await likeService.createLike(idPost, idUser);
      res.status(201).json(like);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  static async getLikesByPostId(req, res) {
    try {
      const { idPost } = req.params;
      const likes = await likeService.getLikesByPostId(idPost);
      res.status(200).json(likes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteLike(req, res) {
    try {
      const { idPost, idUser } = req.query;
      const deletedLike = await likeService.deleteLike(idPost, idUser);
      res.status(200).json(deletedLike);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = LikeController;
