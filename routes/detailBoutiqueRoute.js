const express = require("express");
const router = express.Router();

const detailBoutiqueController = require("../controllers/detailBoutiqueController");

// Récupérer tous les détails
router.get("/", detailBoutiqueController.getDetails);

// Récupérer un détail par son ID
router.get("/:id", detailBoutiqueController.getDetailById);

// Récupérer tous les détails d'une boutique spécifique
router.get("/boutique/:idBoutique", detailBoutiqueController.getDetailsByBoutiqueId);

// Créer un nouveau détail
router.post("/", detailBoutiqueController.createDetail);

// Mettre à jour un détail existant
// router.patch("/:id", detailBoutiqueController.updateDetail);
router.patch("/:userId", detailBoutiqueController.updateBoutiqueAndDetail);

// Prend boutique detail par l'user
router.get("/user/:userId", detailBoutiqueController.getDetailBoutiqueByUserId);

// upprimer un détail
router.delete("/:id", detailBoutiqueController.deleteDetail);

module.exports = router;