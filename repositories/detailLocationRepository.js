const DetailLocation = require("../models/detailLocationModel");

class DetailLocationRepository {

    async create(data) {
        return await DetailLocation.create(data);
    }

    async findAll() {
        return await DetailLocation
            .find({ deletedAt: null })
            .populate({
                path: "idLocation",
                populate: {
                    path: "idUser"
                }
            })
            .populate("idBox");
    }


    async findById(id) {
        return await DetailLocation
            .findById(id)
            .populate("idLocation")
            .populate("idBox");
    }

    async findByLocation(idLocation) {
        return await DetailLocation
            .find({ idLocation, deletedAt: null })
            .populate("idBox");
    }

    async softDelete(id) {
        return await DetailLocation.findByIdAndUpdate(
            id,
            { deletedAt: new Date() },
            { new: true }
        );
    }
    async findByLocationAndBox(locationIds, idBox) {
        return await DetailLocation.findOne({
            idLocation: { $in: locationIds },
            idBox: idBox
        });
    }

    async updateStatus(id, status) {
        return await DetailLocation.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
    }




}

module.exports = new DetailLocationRepository();
