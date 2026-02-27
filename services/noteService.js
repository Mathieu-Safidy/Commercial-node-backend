const NoteRepository = require('../repositories/noteRepository');
const ProduitService = require('./produitService');
class NoteService {
    static async createNote(noteData) {
        const produit = await ProduitService.getProduitById(noteData.idProduit);
        if (produit) {
           noteData.idBoutique = produit.idBoutique; 
        }
        return await NoteRepository.createNote(noteData);
    }

    static async getAllNotes() {
        return await NoteRepository.getAllNotes();
    }

    static async getNoteById(id) {
        return await NoteRepository.getNoteById(id);
    }

    static async findNoteByProduit(idProduit) {
        return await NoteRepository.findNoteByProduit(idProduit);
    }


}

module.exports = NoteService;