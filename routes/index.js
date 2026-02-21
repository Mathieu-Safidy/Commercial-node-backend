var express = require('express');
const ProduitController = require('../controllers/produitController');
var router = express.Router();

var commandeRouter = require("./commandeRoute");
var commandeDetailRouter = require("./commandeDetailRoute");
var stockRouter = require("./stockRoute") ;
var panierRouter = require("./panierRouter") ;
var produitRouter = require("./produitRoute") ;
var categorieRouter = require("./categorieRoute") ;

router.use('/categories', categorieRouter) ;
router.use('/commandes' , commandeRouter) ;
router.use('/commandeDetails' , commandeDetailRouter) ;
router.use('/paniers' , panierRouter) ;
router.use('/stocks', stockRouter) ;
router.use('/produits', produitRouter) ;
// router.get('/produits', ProduitController.getAllProduits);




/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', message: 'Bienvenue sur Express' });
});


module.exports = router;