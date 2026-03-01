const commentaireService = require('../services/commentaireService');

class CommentaireController {
    static async createCommentaire(req, res) {
        try {
            const { idUser, idPost, contenu } = req.body;
            const commentaire = await commentaireService.createCommentaire({ idUser, idPost, contenu });
            res.status(201).json(commentaire);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    static async getCommentairesByPostId(req, res) {
        try {
            const { idPost } = req.params;
            const commentaires = await commentaireService.getAllCommentairesByPostId(idPost);
            res.json(commentaires);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    static async getCommentaireById(req, res) {
        try {
            const { id } = req.params;
            const commentaire = await commentaireService.getCommentaireById(id);
            res.json(commentaire);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    static async updateCommentaire(req, res) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const updatedCommentaire = await commentaireService.updateCommentaire(id, updatedData);
            res.json(updatedCommentaire);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    static async deleteCommentaire(req, res) {
        try {
            const { id } = req.params;
            const deletedCommentaire = await commentaireService.deleteCommentaire(id);
            res.json(deletedCommentaire);
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }
}   

module.exports = CommentaireController;