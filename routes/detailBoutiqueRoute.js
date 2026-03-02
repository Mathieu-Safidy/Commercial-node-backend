const express = require("express");
const router = express.Router();

const detailBoutiqueController = require("../controllers/detailBoutiqueController");

const multer = require('multer');
const detailBoutiqueRepository = require("../repositories/detailBoutiqueRepository");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Récupérer tous les détails
router.get("/", detailBoutiqueController.getDetails);

// Récupérer un détail par son ID
router.get("/:id", detailBoutiqueController.getDetailById);

// Récupérer tous les détails d'une boutique spécifique
router.get("/boutique/:idBoutique", detailBoutiqueController.getDetailsByBoutiqueId);

// Créer un nouveau détail
router.post("/", upload.single('image') , detailBoutiqueController.createDetail);

// Mettre à jour un détail existant
// router.patch("/:id", detailBoutiqueController.updateDetail);
router.patch("/:userId", upload.single('image'), detailBoutiqueController.updateBoutiqueAndDetail);

// Prend boutique detail par l'user
router.get("/user/:userId", detailBoutiqueController.getDetailBoutiqueByUserId);

// upprimer un détail
router.delete("/:id", detailBoutiqueController.deleteDetail);


router.get("/dashboard/:idBoutique", detailBoutiqueController.getDashboard) ; 


module.exports = router;