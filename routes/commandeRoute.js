const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");

// Récupérer toutes les commandes
router.get("/", commandeController.getCommandes);

// Récupérer une commande par son ID
router.get("/:id", commandeController.getCommandeById);

// Créer une nouvelle commande
router.post("/", commandeController.createCommande);

// Mettre à jour une commande existante
router.patch("/:id", commandeController.updateCommande);

// Supprimer une commande
router.delete("/:id", commandeController.deleteCommande);

router.post("/confirme/:idUser", commandeController.confirmeClientCommande);

module.exports = router;
