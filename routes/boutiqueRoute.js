const router = require('express').Router();
const boutiqueController = require('../controllers/boutiqueController');


router.get('/user/:userId', boutiqueController.getBoutiquesByUserId);
router.get('/:id', boutiqueController.getBoutiqueById);
router.get('/', boutiqueController.getAllBoutiques);

module.exports = router;