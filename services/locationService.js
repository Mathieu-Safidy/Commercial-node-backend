const locationRepository = require("../repositories/locationRepository");
const detailLocationRepository = require("../repositories/detailLocationRepository") ;
class LocationService {

    async createLocation(data) {
        data.dateLocation = new Date();
        return await locationRepository.create(data);
    }

    async getAllLocations() {
        return await locationRepository.findAll();
    }

    async getLocationById(id) {
        return await locationRepository.findById(id);
    }

    async updateLocation(id, data) {
        return await locationRepository.update(id, data);
    }

    async deleteLocation(id) {
        return await locationRepository.delete(id);
    }
    async validateUserBox(idUser, idBox) {


        const locations = await locationRepository.findByUser(idUser);

        if (!locations.length) {
            throw new Error("Aucune location trouvée pour cet utilisateur");
        }

        const locationIds = locations.map(loc => loc._id);

        const detail = await detailLocationRepository.findByLocationAndBox(
            locationIds,
            idBox
        );

        if (!detail) {
            throw new Error("Ce box ne correspond pas à cet utilisateur");
        }

        return await detailLocationRepository.updateStatus(detail._id, "valide");
    }

}

module.exports = new LocationService();
