const BoutiqueRepository = require("../repositories/boutiqueRepository");
const ProduitRepository = require("../repositories/produitRepository");
const StockRepository = require("../repositories/stockRepository");

class ProduitService {
    static getAllProduits = async () => {
        let produits = await ProduitRepository.getAllProduits();
        produits = await Promise.all(
            produits.map(async (produit) => {
                let rest = { ...produit.toObject() };
                const lastStock = await StockRepository.findLastStockByProduit(produit._id);
                // console.log( "prduit : ",produit._id, lastStock);
                rest.quantiteDisponible = lastStock ? lastStock.quantiteDisponible ?? 0 : 0;
                
                rest.boutique = await BoutiqueRepository.getBoutiqueById(produit.idBoutique);
                return rest;
            })
        );
        return produits;
    }
}

module.exports = ProduitService;