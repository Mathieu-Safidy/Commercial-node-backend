const commentaireRepo = require('../repositories/commentaireRepository');

class CommentaireService {
    static async createCommentaire(data) {
        return commentaireRepo.create(data);
    }

    static async getAllCommentairesByPostId(idPost) {
        return commentaireRepo.getAllCommentairesByPostId(idPost);
    }

    static async getCommentaireById(id) {
        return commentaireRepo.getCommentaireById(id);
    }

    static async updateCommentaire(id, data) {
        return commentaireRepo.updateCommentaire(id, data);
    }

    static async deleteCommentaire(id) {
        return commentaireRepo.deleteCommentaire(id);
    }
}

module.exports = CommentaireService;