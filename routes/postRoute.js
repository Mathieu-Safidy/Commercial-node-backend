const router = require('express').Router();
const PostController = require('../controllers/postController');
const upload = require('../middleware/chargerImage');

router.get('/user/:idUser', PostController.getPostByRole);
router.get('/:id', PostController.getPostById);
router.get('/', PostController.getAllPosts);
router.post('/', upload.array('images', 5), PostController.createPost);
router.delete('/:id', PostController.deletePost);

module.exports = router;