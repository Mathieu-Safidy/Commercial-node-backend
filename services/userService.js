const userRepo = require('../repositories/userRepositorie');

class UserService {
    async createUser(data) {
        return await userRepo.create(data);
    }

    async getAllUsers() {
        return await userRepo.findAll();
    }

    static async getUserById(id) {
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
}

module.exports = new UserService();
