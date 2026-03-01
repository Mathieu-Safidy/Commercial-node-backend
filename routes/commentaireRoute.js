const router = require('express').Router();
const CommentaireController = require('../controllers/commentaireController');

router.get('/post/:idPost', CommentaireController.getCommentairesByPostId);
router.get('/:id', CommentaireController.getCommentaireById);
router.patch('/:id', CommentaireController.updateCommentaire);
router.delete('/:id', CommentaireController.deleteCommentaire);
router.post('/', CommentaireController.createCommentaire);

module.exports = router;