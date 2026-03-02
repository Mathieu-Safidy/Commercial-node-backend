const router = require('express').Router();
const ProduitController = require('../controllers/produitController');
var {authMiddleware , restrictedTo} = require('../middleware/authMiddleware') ;
const upload = require('../middleware/chargerImage') ;

router.get('/:id', ProduitController.getProduitById);
router.get('/', ProduitController.getAllProduits);

router.use(authMiddleware);
router.use(restrictedTo('Boutique'));

router.get('/boutique/:idBoutique', ProduitController.getProduitsByBoutiqueId);

router.patch('/:id', upload.single('image'), ProduitController.updateProduit);
router.post('/', upload.single('image'), ProduitController.saveProduit);

module.exports = router;