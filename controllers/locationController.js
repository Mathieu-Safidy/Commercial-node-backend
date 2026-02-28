const locationService = require("../services/locationService");
const detailLocationService = require("../services/detailLocationService");
const emailService = require("../services/mailService");
class LocationController {

    async getLocations(req, res) {
        try {
            const locations = await locationService.getAllLocations();
            res.json(locations);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }
    async getDetailLocation(req, res) {
        try {
            const detailLocation = await detailLocationService.getAllDetails();
            res.json(detailLocation);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async getLocationById(req, res) {
        try {
            const location = await locationService.getLocationById(req.params.id);
            res.json(location);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async validateLocationBox(req, res) {
        try {

            const { idUser, idBox } = req.params;

            const updated = await locationService.validateUserBox(idUser, idBox);
            if (updated) {
                const data = await locationService.getDataValdation(idUser, updated.idLocation._id);
                await emailService.sendMailLocation(data.email_Send, "Validation de votre location : "+data.id, data);
            }
            res.json({
                message: "Box validé avec succès",
                detail: updated
            });

        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    async createLocationWithDetails(req, res) {
        try {

            const { note, idUser, details } = req.body;

            const location = await locationService.createLocation({
                note,
                idUser,
                dateLocation: new Date()
            });

            for (const item of details) {
                await detailLocationService.createDetailLocation({
                    idLocation: location._id,
                    idBox: item.idBox,
                    dateDebut: item.dateDebut,
                    prixFinal: item.prixFinal ,
                    status: "en attente",
                    createdAt:item.dateDebut
                });
            }

            res.status(201).json({
                message: "Location créée avec succès",
                locationId: location._id
            });

        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    async deleteLocation(req, res) {
        try {
            await locationService.deleteLocation(req.params.id);
            res.json({ message: "Location supprimée" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new LocationController();
