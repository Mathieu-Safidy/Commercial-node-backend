
const router = require('express').Router();
const PanierController = require('../controllers/panierController');

router.patch('/modify/details/:idDetail', PanierController.modifyDetailFromPanier);
router.delete('/delete/details/:idDetail', PanierController.deleteDetailFromPanier);
// router.post('/add/details/:panierId', PanierController.addDetailToPanier);
router.post('/add/details/:idUser', PanierController.addToPanier);
router.post('/add', PanierController.createPanier);
router.get('/actif/:idUser', PanierController.getPanierActifByIdUser);
router.get('', PanierController.getAllPaniers);

module.exports = router;