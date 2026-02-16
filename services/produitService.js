const BoutiqueRepository = require("../repositories/boutiqueRepository");
const ProduitRepository = require("../repositories/produitRepository");

class ProduitService {
    static getAllProduits = async () => {
        let produits = await ProduitRepository.getAllProduits();
        produits = await Promise.all(
            produits.map(async (produit) => {
                let rest = { ...produit.toObject() };
                rest.boutique = await BoutiqueRepository.getBoutiqueById(produit.idBoutique);
                return rest;
            })
        );
        return produits;
    }
}

module.exports = ProduitService;