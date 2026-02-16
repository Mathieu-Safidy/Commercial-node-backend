const express = require("express");
const router = express.Router();
const commandeDetailController = require("../controllers/CommandeDetailController");

// Récupérer tous les détails de commandes
router.get("/", commandeDetailController.getDetails);

// Récupérer un détail par son ID
router.get("/detail/:id", commandeDetailController.getDetailById);

// Récupérer un détail par ID commande
router.get("/commande/:id", commandeDetailController.getDetailByCommandeId);

// Créer un nouveau détail de commande
router.post("/", commandeDetailController.createDetail);

// Mettre à jour un détail de commande existant
router.patch("/:id", commandeDetailController.updateDetail);

// Supprimer un détail de commande
router.delete("/:id", commandeDetailController.deleteDetail);

module.exports = router;
