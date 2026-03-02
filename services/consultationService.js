const consultationRepo = require('../repositories/consultationRepository');

class ConsultationService {

    // Ajouter une consultation ou incrémenter le nombre
    async addConsultation(idProduit, mois, annee) {
        const consultation = await consultationRepo.findOrCreate(idProduit, mois, annee);
        consultation.nombreConsultation += 1;
        return await consultation.save();
    }

    // Récupérer toutes les consultations
    async getAllConsultations() {
        return await consultationRepo.getAll();
    }

    // Récupérer consultations d’un produit
    async getConsultationsByProduit(idProduit) {
        return await consultationRepo.getByProduit(idProduit);
    }

    // Supprimer une consultation
    async deleteConsultation(id) {
        return await consultationRepo.delete(id);
    }

    // Mettre à jour une consultation
    async updateConsultation(id, data) {
        return await consultationRepo.update(id, data);
    }
    async findOrCreate(idProduit, mois, annee) {
        return await consultationRepo.findOrCreate(idProduit, mois, annee);
    }
    async findByidProduit() { 
        return await consultationRepo.getByProduit(idProduit) ; 
    }

}

module.exports = new ConsultationService();