const userRepo = require('../repositories/userRepositorie');
const profilRepo = require('../repositories/profilRepository');
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
}

module.exports = new UserService();
