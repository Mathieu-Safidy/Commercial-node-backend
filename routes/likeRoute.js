const router = require('express').Router();
const LikeController = require('../controllers/likeController');

router.get('/post/:idPost', LikeController.getLikesByPostId);
router.delete('/', LikeController.deleteLike);
router.post('/', LikeController.createLike);

module.exports = router;