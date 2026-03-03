const userRepo = require('../repositories/userRepositorie');
const profilRepo = require('../repositories/profilRepository');
const crypto = require("crypto");

const bcrypt = require('bcrypt')
class UserService {
    async createUserSave(email, username, password, idProfil) {
        return await userRepo.createSave(email, username, password, idProfil);
    }

    async getAllUsers() {
        return await userRepo.findAll();
    }

    async getUserById(id) {
        return await userRepo.findById(id);
    }

    async getUserByEmail(email) {
        return await userRepo.findByEmail(email);
    }

    async updateUser(id, data) {
        return await userRepo.update(id, data);
    }

    async deleteUser(id) {
        return await userRepo.delete(id);
    }
    async getidProfilByIdProfilFront(idProfilFront) { 
        if (idProfilFront == 1) {
            return await profilRepo.findByName("Admin");
        } 
        else if (idProfilFront == 2) {
            return await profilRepo.findByName("Boutique");
        }

    }
    async generatePassword(length = 10) {
        return crypto
            .randomBytes(length)
            .toString("base64")
            .replace(/[^a-zA-Z0-9]/g, "")
            .slice(0, length);
    }
    async hashPassword(password) {
        return  await bcrypt.hash(password, 12);
    }
}


module.exports = new UserService();
