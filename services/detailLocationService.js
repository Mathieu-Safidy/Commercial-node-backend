const detailLocationRepository = require("../repositories/detailLocationRepository");

class DetailLocationService {

    async createDetailLocation(data) {
        return await detailLocationRepository.create(data);
    }

    async getAllDetails() {
        return await detailLocationRepository.findAll();
    }

    async getDetailById(id) {
        return await detailLocationRepository.findById(id);
    }

    async getDetailsByLocation(idLocation) {
        return await detailLocationRepository.findByLocation(idLocation);
    }

    async deleteDetail(id) {
        return await detailLocationRepository.softDelete(id);
    }
    async updateStatus(id, status) {
        return await detailLocationRepository.updateStatus(id, status);
    }

}

module.exports = new DetailLocationService();
