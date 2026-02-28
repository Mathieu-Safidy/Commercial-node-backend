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
const detailBoutiqueRouter = require('./detailBoutiqueRoute') ;
const promotionRouter = require('./promotionRoute') ;
const noteRouter = require('./noteRoute') ;
const userRouter = require('./userRoute') ;

router.use('/notes', noteRouter) ;
router.use('/auth', authRouter) ;
router.use('/produits', produitRouter) ;
router.use('/boxes', boxRouter);

const { authMiddleware } = require('../middleware/authMiddleware') ;
router.use(authMiddleware);

router.use('/commandes', commandeRouter);
router.use('/commandeDetails', commandeDetailRouter);
router.use('/locations', locationRouter);
router.use('/detailLocations', detailLocationRouter);

router.use('/categories', categorieRouter) ;
router.use('/commandes' , commandeRouter) ;
router.use('/commandeDetails' , commandeDetailRouter) ;
router.use('/paniers' , panierRouter) ;
router.use('/stocks', stockRouter) ;
router.use('/detailBoutique', detailBoutiqueRouter) ;
router.use('/promotions', promotionRouter) ;
router.use('/users', userRouter) ;





/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', message: 'Bienvenue sur Express' });
});


module.exports = router;