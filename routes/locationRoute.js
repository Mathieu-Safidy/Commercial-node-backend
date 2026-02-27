const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

// Récupérer toutes les locations
router.get("/", locationController.getLocations);

// Récupérer une location par ID
router.get("/:id", locationController.getLocationById);

// Créer une location avec details
router.post("/create-with-details", locationController.createLocationWithDetails);

// Supprimer une location
router.delete("/:id", locationController.deleteLocation);

// // Récupérer toutes les locations d’un user
// router.get("/user/:idUser", locationController.getLocationsByUser);

// Valider un box d’un user
router.patch(
    "/validate/:idUser/:idBox",
    locationController.validateLocationBox
);

module.exports = router;
