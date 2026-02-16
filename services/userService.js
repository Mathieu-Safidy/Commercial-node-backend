const userRepo = require('../repositories/userRepositorie');

class UserService {
    async createUser(data) {
        return userRepo.create(data);
    }

    async getAllUsers() {
        return userRepo.findAll();
    }

    async getUserById(id) {
        return userRepo.findById(id);
    }

    async getUserByEmail(email) {
        return userRepo.findByEmail(email);
    }

    async updateUser(id, data) {
        return userRepo.update(id, data);
    }

    async deleteUser(id) {
        return userRepo.delete(id);
    }
}

module.exports = new UserService();
