const express = require("express");
const router = express.Router();
//const detailLocationController = require("../controllers/detailLocationController");
const locationController = require("../controllers/locationController");

// Récupérer tous les details
router.get("/", locationController.getDetailLocation);
//
// // Récupérer un detail par ID
// router.get("/:id", detailLocationController.getDetailById);
//
// // Créer un detail seul
// router.post("/", detailLocationController.createDetail);
//
// // Mettre à jour un detail
// router.patch("/:id", detailLocationController.updateDetail);
//
// // Supprimer un detail
// router.delete("/:id", detailLocationController.deleteDetail);
//
// // Récupérer les details par location
// router.get(
//     "/location/:idLocation",
//     detailLocationController.getDetailsByLocation
// );

module.exports = router;
