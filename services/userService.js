const userRepo = require('../repositories/userRepositorie');
const crypto = require("crypto");

class UserService {
    async createUser(data) {
        return await userRepo.create(data);
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


    async generatePassword(length = 10) {
        return crypto
            .randomBytes(length)
            .toString("base64")
            .replace(/[^a-zA-Z0-9]/g, "")
            .slice(0, length);
    }
}

module.exports = new UserService();
