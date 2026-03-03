
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Récupérer tous les utilisateurs
router.get("/", userController.getAllUsers);

// Récupérer un utilisateur par son ID
router.get("/:id", userController.getUserById);

// Créer un nouvel utilisateur
router.post("/", userController.createUser);

// Mettre à jour un utilisateur existant
router.put("/:id", userController.updateUser);

router.delete("/:idUser" , userController.deleteUser); 

module.exports = router;
