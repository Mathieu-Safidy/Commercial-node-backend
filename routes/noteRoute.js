const router = require('express').Router();
const NoteController = require('../controllers/noteController');
const { authMiddleware, restrictedTo } = require('../middleware/authMiddleware');

router.get('/produit/:idProduit',NoteController.findNoteByProduit);
router.get('/:id', authMiddleware, restrictedTo(['Boutique']), NoteController.getNoteById);
router.get('/', NoteController.getAllNotes);

router.post('/', authMiddleware, restrictedTo(['User']), NoteController.createNote);

module.exports = router;