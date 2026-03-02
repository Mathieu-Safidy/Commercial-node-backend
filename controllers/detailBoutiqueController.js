const detailBoutiqueService = require("../services/detailBoutiqueService");
const boutiqueService = require("../services/boutiqueService") ;
class DetailBoutiqueController {

    async getDetails(req, res) {
        try {
            const details = await detailBoutiqueService.getAllDetails();
            res.json(details);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async getDetailById(req, res) {
        try {
            const detail = await detailBoutiqueService.getDetailById(req.params.id);
            res.json(detail);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async getDetailBoutiqueByUserId(req , res ) {
        try{
            const { userId } = req.params
            const boutiqueBase = await boutiqueService.getBoutiquesByUserId(userId);
            const details = await detailBoutiqueService.getDetailsByBoutiqueId(boutiqueBase[0]._id);


            // console.log("userId:", userId);
            // console.log("boutiqueBase:", boutiqueBase);
            // console.log("details:" ,  details) ;
            res.json(details);

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async getDetailsByBoutiqueId(req, res) {
        try {
            const { idBoutique } = req.params;
            const details = await detailBoutiqueService.getDetailsByBoutiqueId(idBoutique);
            res.json(details);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async createDetail(req, res) {
        try {
            const boutique = JSON.parse(req.body.boutique);
            const detail = JSON.parse(req.body.detail);
            if (req.file) {
                boutique.image = req.file.path;
            }

            const newBoutique = { 
                nom: boutique.nom,
                description: boutique.description,
                idUser: boutique.idUser,
                idCategorie: boutique.idCategorie,
                image: boutique.image
            }
console.log("newBoutique", newBoutique);
            const createdBoutique = await boutiqueService.createBoutique(newBoutique);

            const newDetail = await detailBoutiqueService.createDetail({
                ...detail,
                idBoutique: createdBoutique._id
            });

            res.status(201).json({
                boutique: newBoutique,
                detail: newDetail
            });

        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    async updateBoutiqueAndDetail(req, res) {
        try {
            const userId = req.params.userId;
            const boutique = JSON.parse(req.body.boutique);
            const detail = JSON.parse(req.body.detail);
            const boutiqueBase = await boutiqueService.getBoutiquesByUserId(userId);

            if (!boutiqueBase ) {
                return res.status(404).json({ message: 'Boutique introuvable' });
            }
            const boutiqueObj = boutiqueBase[0];
            if (boutique?.nom) {
                if (req.file) {
                    boutique.image = req.file.path;
                }
                const newBoutique = { 
                    nom: boutique.nom,
                    description: boutique.description,
                    idUser: boutique.idUser,
                    idCategorie: boutique.idCategorie,
                    image: boutique.image
                }
                await boutiqueService.updateBoutique(boutiqueObj._id, newBoutique);
            }
            // Récupérer le détail
            const details = await detailBoutiqueService.getDetailsByBoutiqueId(boutiqueObj._id);
            const detailObj = Array.isArray(details) ? details[0] : details;
            if (!detailObj) {
                return res.status(404).json({ message: 'Detail boutique introuvable' });
            }
            await detailBoutiqueService.updateDetail(detailObj._id, detail);
            // res.json(updatedDetail);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    async updateDetail(req, res) {
        try {
            const updated = await detailBoutiqueService.updateDetail(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    async deleteDetail(req, res) {
        try {
            await detailBoutiqueService.deleteDetail(req.params.id);
            res.json({ message: "DetailBoutique supprimé" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }
    async getDashboard(req , res ) { 
        try { 
            const { idBoutique } = req.params;
            console.log("Data id", idBoutique); 
            const chiffreAffaire = await boutiqueService.getChiffreAffaireByBoutiqueId(idBoutique);
            const venteTotale = await boutiqueService.getTotalVente(idBoutique) ; 
            const avisNote = await boutiqueService.getAvisNoteMoyenne(idBoutique) ;
          //  const totalConsultation = await boutiqueService.totalConsultation(idBoutique) ; 
            const totalConsultation  = 0 ;  
            console.log("CA :::", chiffreAffaire ); 
            console.log("VenteTotal ::: " , venteTotale) ;
            console.log("Avis Note :::" , avisNote )  ; 
            res.json({  
                chiffreAffaire,
                venteTotale,
                avisNote , 
                totalConsultation 
            });
        }catch(err){ 
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new DetailBoutiqueController();