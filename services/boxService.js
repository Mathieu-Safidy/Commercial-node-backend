const boxRepository = require("../repositories/boxRepository");

class BoxService {

    async createBox(data) {
        return boxRepository.create(data);
    }

    async getAllBoxes() {
        return boxRepository.findAll();
    }

    async getBoxById(id) {
        return boxRepository.findById(id);
    }

    async updateBox(id, data) {
        return boxRepository.update(id, data);
    }

    async deleteBox(id) {
        return boxRepository.softDelete(id);
    }
}

module.exports = new BoxService();
