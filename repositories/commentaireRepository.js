const commentaireModel = require('../models/commentaireModel') ;
class CommentaireRepository {
    static async create(commentaireData) {
        const commentaire = new commentaireModel(commentaireData);
        return await commentaire.save();
    }

    static async getAllCommentairesByPostId(idPost) {
        return await commentaireModel.find({ idPost }).populate('idUser');
    }

    static async getCommentaireById(id) {
        return await commentaireModel.findById(id).populate('idUser');
    }

    static async updateCommentaire(id, updatedData) {
        return await commentaireModel.findByIdAndUpdate(id, updatedData, { new: true });
    }

    static async deleteCommentaire(id) {
        return await commentaireModel.findByIdAndDelete(id);
    }
    

}

module.exports = CommentaireRepository;