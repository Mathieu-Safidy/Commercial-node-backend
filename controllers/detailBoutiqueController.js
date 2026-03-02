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
            console.log("boutiqueBase in controller : ", boutiqueBase);
            const details = await detailBoutiqueService.getDetailsByBoutiqueId(boutiqueBase._id);


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

            const { boutique, detail } = req.body;
            const newBoutique = await boutiqueService.createBoutique(boutique);

            const newDetail = await detailBoutiqueService.createDetail({
                ...detail,
                idBoutique: newBoutique._id
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
            const { boutique, detail } = req.body;
            const boutiqueBase = await boutiqueService.getBoutiquesByUserId(userId);

            if (!boutiqueBase ) {
                return res.status(404).json({ message: 'Boutique introuvable' });
            }
            const boutiqueObj = boutiqueBase[0];
            if (boutique?.nom) {
                await boutiqueService.updateBoutique(boutiqueObj._id, boutique);
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
}

module.exports = new DetailBoutiqueController();