const express = require('express');
const router = express.Router();
const commandeRouter = require("./commandeRoute");
const commandeDetailRouter = require("./commandeDetailRoute");
const locationRouter = require("./locationRoute");
const detailLocationRouter = require("./detailLocationRoute") ;
const boxRouter = require("./boxRoute") ;
const stockRouter = require("./stockRoute") ;
const panierRouter = require("./panierRouter") ;
const produitRouter = require("./produitRoute") ;
const categorieRouter = require("./categorieRoute") ;
const authRouter = require('./authRoute');

router.use('/auth', authRouter) ;

router.use('/produits', produitRouter) ;

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


var stockRouter = require("./stockRoute") ;
var panierRouter = require("./panierRouter") ;
var produitRouter = require("./produitRoute") ;
var categorieRouter = require("./categorieRoute") ;

router.use('/categories', categorieRouter) ;
router.use('/commandes' , commandeRouter) ;
router.use('/commandeDetails' , commandeDetailRouter) ;
router.use('/paniers' , panierRouter) ;
router.use('/stocks', stockRouter) ;






/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', message: 'Bienvenue sur Express' });
});


module.exports = router;