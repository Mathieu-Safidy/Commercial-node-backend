var express = require('express');
const PanierController = require('../controllers/panierController');
const ProduitController = require('../controllers/produitController');
const LocationController = require('../controllers/locationController') ;

var router = express.Router();

var commandeRouter = require("./commandeRoute");
var commandeDetailRouter = require("./commandeDetailRoute");
var locationRouter = require("./locationRoute");
var detailLocationRouter = require("./detailLocationRoute") ;
var boxRouter = require("./boxRoute") ;
router.use('/commandes', commandeRouter);
router.use('/commandeDetails', commandeDetailRouter);
router.use('/locations', locationRouter);
router.use('/detailLocations', detailLocationRouter);
router.use('/boxes', boxRouter);

router.get('/produits', ProduitController.getAllProduits);


router.patch('/paniers/modify/details/:idDetail', PanierController.modifyDetailFromPanier);
router.delete('/paniers/delete/details/:idDetail', PanierController.deleteDetailFromPanier);
// router.post('/paniers/add/details/:panierId', PanierController.addDetailToPanier);
router.post('/paniers/add/details/:idUser', PanierController.addToPanier);
router.post('/paniers/add', PanierController.createPanier);
router.get('/paniers/actif/:idUser', PanierController.getPanierActifByIdUser);
router.get('/paniers', PanierController.getAllPaniers);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', message: 'Bienvenue sur Express' });
});


module.exports = router;