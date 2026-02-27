const NoteModel = require('../models/noteModel');
class NoteRepository {

    static async createNote(noteData) {
        const note = new NoteModel(noteData);
        return await note.save();
    }

    static async getAllNotes() {
        return await NoteModel.find();
    }

    static async getNoteById(id) {
        return await NoteModel.findById(id);
    }

    static async findNoteByProduit(idProduit) {
        return await NoteModel.find({ idProduit });
    }


}

module.exports = NoteRepository;