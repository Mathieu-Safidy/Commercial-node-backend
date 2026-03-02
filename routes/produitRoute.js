const router = require('express').Router();
const ProduitController = require('../controllers/produitController');
var {authMiddleware , restrictedTo} = require('../middleware/authMiddleware') ;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get('/:id', ProduitController.getProduitById);
router.get('/', ProduitController.getAllProduits);
router.get('/boutique/:idBoutique', ProduitController.getAllProduitsByIdBoutique) ; 
router.use(authMiddleware);
router.use(restrictedTo('Boutique'));

router.patch('/:id', upload.single('image'), ProduitController.updateProduit);
router.post('/', upload.single('image'), ProduitController.saveProduit);

module.exports = router;