const NoteService = require('../services/noteService');
const NoteMode = require('../models/noteModel');
class NoteController {
    static async createNote(req, res) {
        try {
            const noteData = req.body;
            const user = req.user;
            const donne = new NoteMode({
                idProduit: noteData.idProduit,
                idUser: user._id,
                nombreEtoiles: noteData.note,
                commentaire: noteData.commentaire
            });
            const newNote = await NoteService.createNote(donne);
            res.status(201).json(newNote);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getAllNotes(req, res) {
        try {
            const notes = await NoteService.getAllNotes();
            res.status(200).json(notes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getNoteById(req, res) {
        try {
            const id = req.params.id;
            const note = await NoteService.getNoteById(id);
            if (!note) {
                return res.status(404).json({ message: "Note not found" });
            }
            res.status(200).json(note);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async findNoteByProduit(req, res) {
        try {
            const idProduit = req.params.idProduit;
            const note = await NoteService.findNoteByProduit(idProduit);
            // if (!note) {
            //     return res.status(404).json({ message: "Note not found for this product" });
            // }
            res.status(200).json(note || []);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = NoteController;