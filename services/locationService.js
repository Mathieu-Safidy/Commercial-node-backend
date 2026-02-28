const locationRepository = require("../repositories/locationRepository");
const detailLocationRepository = require("../repositories/detailLocationRepository") ;
const userService = require("./userService");
const profilService = require("./profilService");
const AuthService = require("./authService");
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

    //  subject,
    //     prenom: data.prenom,
    //     nom: data.nom,
    //     email: data.email,
    //     mot_de_passe: data.mot_de_passe,
    //     date: data.date,
    //     id: data.id,
    //     company: process.env.COMPANY_NAME || "MonEntreprise",
    //     annee: data.annee || new Date().getFullYear(),
    //     lien_desinscription: data.lien_desinscription || "#",
    //     lien_confidentialite: data.lien_confidentialite || "#"

    async getDataValdation(idUser, idLocation) {
        const user = await userService.getUserById(idUser);
        const data = {
            username: user.username,
            email: `boutique${idLocation.toString().padStart(5, '0')}@gmail.com`,
            mot_de_passe: await userService.generatePassword(),
            date: new Date().toLocaleDateString(),
            id: `LOC-${idLocation.toString().padStart(5, '0')}`,
            email_Send: user.email
        }
        const profil = await profilService.getProfilByName("Boutique");
        if (!profil) {
            throw new Error("Profil 'Boutique' non trouvé");
        }
        const newUser = await userService.createUser({
            username: `boutique${idLocation.toString().padStart(5, '0')}`,
            email: data.email,
            password: await AuthService.hashPassword(data.mot_de_passe),
            idProfil: profil._id
        });
        if (!newUser) {
            throw new Error("Erreur lors de la création du compte utilisateur pour la validation de la location");
        }
        
        return data;
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
