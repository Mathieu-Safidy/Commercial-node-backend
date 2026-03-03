const boutiqueRepo = require('../repositories/boutiqueRepository');
const commandeDetailService = require('./commandeDetailService');
const consultationService = require('./consultationService');
const NoteService = require('./noteService');
const ProduitService = require('./produitService');

class BoutiqueService {

    async createBoutique(data) {
        return boutiqueRepo.create(data);
    }

    async getAllBoutiques() {
        return boutiqueRepo.findAll();
    }

    async getBoutiqueById(id) {
        return boutiqueRepo.findById(id);
    }

    async getBoutiquesByUserId(idUser) {
        console.log("idUser in service : ", idUser); 
        return boutiqueRepo.findByUserId(idUser);
    }

    async getBoutiquesByCategorieId(idCategorie) {
        return boutiqueRepo.findByCategorieId(idCategorie);
    }

    async updateBoutique(id, data) {
        return boutiqueRepo.update(id, data);
    }

    async deleteBoutique(id) {
        return boutiqueRepo.delete(id);
    }

    async getChiffreAffaireByBoutiqueId(idBoutique) {
        let chiffreAffaire = 0;
        let listProduits = await ProduitService.getProduitsByBoutiqueId(idBoutique);

        for (let produit of listProduits) {
            let commandeDetails = await commandeDetailService.getDetailsByidProduit(produit._id)
            

            for (let detail of commandeDetails) {
                if (detail.idCommande && detail.idCommande.status === "valide") {
                    chiffreAffaire += detail.prixFinal * detail.quantite;
                    console.log("detail prixFinal :" , detail.prixFinal) ;
                    console.log("detail quantite : " , detail.quantite) ; 
                }
            }
        }

        return chiffreAffaire;
    }

    async getTotalVente(idBoutique) {
        let totalVente = 0;
        let listProduits = await ProduitService.getProduitsByBoutiqueId(idBoutique) ;
        for (let produit of listProduits) {
            let commandeDetails = await commandeDetailService.getDetailsByidProduit(produit._id) ;
            for (let detail of commandeDetails) {
                totalVente += detail.quantite;
            }
        }
        return totalVente;
    }
    async getAvisNoteMoyenne(idBoutique) {
        const listNotes = await NoteService.findNoteByBoutique(idBoutique);
        let totalNote = 0;
        for (let note of listNotes) {
            totalNote += note.nombreEtoiles;
        }
        return listNotes.length > 0 ? totalNote / listNotes.length : 0;
    } 

    async getDataProduitConsulte(idBoutique , mois , annee) { 
        let data = [];
        let listProduits = await ProduitService.getProduitsByBoutiqueId(idBoutique) ;
        for (let produit of listProduits) {
            let consultation = await consultationService.findOrCreate(produit._id, mois, annee);
            data.push({
                nomProduit: produit.nom,
                nombreConsultation: consultation.nombreConsultation
            });
        }
        return data;
    }
    async totalConsultation(idBoutique) { 
       let total = 0 ; 
       let listProduits = await ProduitService.getProduitsByBoutiqueId(idBoutique) ;
        for (let produit of listProduits) {
            let consultation = await consultationService.findByidProduit(produit._id);
            total += consultation.nombreConsultation; 
        } 
        return total ; 
    }
}

module.exports = new BoutiqueService();