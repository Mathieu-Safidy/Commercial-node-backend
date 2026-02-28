// controllers/userController.js
const UserService = require("../services/UserService");

class UserController {

    // Méthode statique pour createUser
    static createUser = async (req, res) => {
        try {
            const { email, username, password, idProfil } = req.body;
            const newidProfil = await UserService.getidProfilByIdProfilFront(idProfil);

            console.log('idProfilFront', idProfil);
            console.log('idProfilBack', newidProfil);
    
            const newUser = await UserService.createUserSave(email, username, password, newidProfil._id);
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    };

    // Méthode statique pour getAllUsers
    static getAllUsers = async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Méthode statique pour getUserById
    static getUserById = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Méthode statique pour updateUser
    static updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const { email, username, password, idProfil } = req.body;
            const updatedUser = await UserService.updateUser(id, { email, username, password, idProfil });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

// Exporter la classe pour utiliser les méthodes statiques
module.exports = UserController;