const promotionModel = require("../models/promotionModel");
const BoutiqueRepository = require("../repositories/boutiqueRepository");
const ProduitRepository = require("../repositories/produitRepository");
const StockRepository = require("../repositories/stockRepository");
const promotionService = require("./promotionService");

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
                let promotion = await promotionService.getPromotionByProduitRecent(produit._id);
                // let promotionItem = promotionModel.create(promotion);
                rest.reduction = promotion ? (promotion.reduction ? promotion.reduction : 0) : 0;
                return rest;
             
            })
        );
        return produits;
    }

    static saveProduit = async (produitData) => {
        const produit = await ProduitRepository.saveProduit(produitData);
        return produit;
    }

    static updateProduit = async (id, produitData) => {
        const updatedProduit = await ProduitRepository.updateProduit(id, produitData);
        return updatedProduit;
    }
    static getProduitById = async (id) => {
        const produit = await ProduitRepository.getProduitById(id);
        return produit;
    }

    static async getProduitsByBoutiqueId(idBoutique) {
        let produits = await ProduitRepository.getProduitsByBoutiqueId(idBoutique);
         produits = await Promise.all(
            produits.map(async (produit) => {
                let rest = { ...produit.toObject() };
                const lastStock = await StockRepository.findLastStockByProduit(produit._id);
                // console.log( "prduit : ",produit._id, lastStock);
                rest.quantiteDisponible = lastStock ? lastStock.quantiteDisponible ?? 0 : 0;
                
                rest.boutique = await BoutiqueRepository.getBoutiqueById(produit.idBoutique);
                let promotion = await promotionService.getPromotionByProduitRecent(produit._id);
                // let promotionItem = promotionModel.create(promotion);
                rest.reduction = promotion ? (promotion.reduction ? promotion.reduction : 0) : 0;
                return rest;
             
            })
        );
        return produits;
    }
}

module.exports = ProduitService;