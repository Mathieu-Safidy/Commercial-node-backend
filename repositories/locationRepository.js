const Location = require("../models/locationModel");

class LocationRepository {

    async create(data) {
        return await Location.create(data);
    }

    async findAll() {
        return await Location.find();
    }

    async findById(id) {
        return await Location.findById(id);
    }

    async update(id, data) {
        return await Location.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Location.findByIdAndDelete(id);
    }
    async findByUser(idUser) {
        return await Location.find({ idUser });
    }

}

module.exports = new LocationRepository();
