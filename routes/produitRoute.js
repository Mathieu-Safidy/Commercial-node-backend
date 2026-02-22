const router = require('express').Router();
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

const ProduitController = require('../controllers/produitController');

router.patch('/:id', upload.single('image'), ProduitController.updateProduit);
router.get('/', ProduitController.getAllProduits);
router.post('/', upload.single('image'), ProduitController.saveProduit);
module.exports = router;