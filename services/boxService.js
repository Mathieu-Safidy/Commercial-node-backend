const boxRepository = require("../repositories/boxRepository");

class BoxService {

    static async createBox(data) {
        return boxRepository.create(data);
    }

    static async getAllBoxes() {
        return boxRepository.findAll();
    }

    static async getBoxById(id) {
        return boxRepository.findById(id);
    }

    static async updateBox(id, data) {
        return boxRepository.update(id, data);
    }

    static async deleteBox(id) {
        return boxRepository.softDelete(id);
    }
}

module.exports = BoxService;
