const panierRepository = require('../repositories/panierRepository');
const panierDetailRepository = require('../repositories/panierDetailRepository');

const panierService = () => {
    const getAllPaniers = async () => {
        const paniers = await panierRepository().getAllPaniers();
        for (const panier of paniers) {
            panier.details = await panierDetailRepository().getPanierDetailsByPanierId(panier._id);
        }
        return paniers;
    }
    
    return {
        getAllPaniers
    }
}

module.exports = panierService;