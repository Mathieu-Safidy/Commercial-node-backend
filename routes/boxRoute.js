const express = require("express");
const router = express.Router();
const boxController = require("../controllers/BoxController");

// Récupérer tous les box
router.get("/", boxController.getBoxes);

// Récupérer un box par ID
router.get("/:id", boxController.getBoxById);

// Créer un box
router.post("/", boxController.createBox);

// Mettre à jour un box
router.patch("/:id", boxController.updateBox);

// Supprimer un box (soft delete)
router.delete("/:id", boxController.deleteBox);

module.exports = router;
