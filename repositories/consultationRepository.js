const Consultation = require('../models/consultationModel');

class ConsultationRepository {

    // Créer une nouvelle consultation
    async create(data) {
        const consultation = new Consultation(data);
        return await consultation.save();
    }

    // Récupérer toutes les consultations
    async getAll() {
        return await Consultation.find();
    }

    // Récupérer une consultation par id
    async getById(id) {
        return await Consultation.findById(id);
    }

    // Récupérer consultations par produit
    async getByProduit(idProduit) {
        return await Consultation.find({ idProduit });
    }

    // Mettre à jour une consultation
    async update(id, data) {
        return await Consultation.findByIdAndUpdate(id, data, { new: true });
    }

    // Supprimer une consultation
    async delete(id) {
        return await Consultation.findByIdAndDelete(id);
    }

    // Trouver ou créer consultation par produit, mois et année
    async findOrCreate(idProduit, mois, annee) {
        let consultation = await Consultation.findOne({
            idProduit,
            moisConsultation: mois,
            anneeConsultation: annee
        });
        if (!consultation) {
            consultation = new Consultation({
                idProduit,
                moisConsultation: mois,
                anneeConsultation: annee,
                nombreConsultation: 0
            });
            await consultation.save();
        }
        return consultation;
    }

}

module.exports = new ConsultationRepository();