const produitModel = require("../models/produitModel");
const ProduitService = require("../services/produitService");

class ProduitController {
    static getAllProduits = async (req, res) => {
        try {
            const produits = await ProduitService.getAllProduits();
             res.status(200).json(produits);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static saveProduit = async (req, res) => {
        try {
            const produitData = req.body;
            produitData.image = req.file ? req.file.path : null; // Assuming the image is uploaded as a file
            const newproduitData = {
                nom: produitData.nom,
                description: produitData.description,
                prixInitial: produitData.prixInitial || 0,
                idCategorie: produitData.idCategorie,
                idBoutique: produitData.idBoutique,
                image: produitData.image,
                quantiteDisponible: produitData.quantiteDisponible || 0,
                consultationCount: 0,
                modifiedAt: null,
                createdAt: new Date(),
                deletedAt: null,
            };
            const produit = await ProduitService.saveProduit(newproduitData);
            res.status(201).json(produit);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getProduitById(req, res) {
        try {
            const id = req.params.id;
            const produit = await ProduitService.getProduitById(id);
            if (!produit) {
                return res.status(404).json({ message: "Produit not found" });
            }
            res.status(200).json(produit);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static updateProduit = async (req, res) => {
        try {
            const id = req.params.id;
            const produitData = req.body;
            if (req.file) {
                produitData.image = req.file.path; // Update image if a new file is uploaded
            }
            const updatedProduit = await ProduitService.updateProduit(id, produitData);
            if (!updatedProduit) {
                return res.status(404).json({ message: "Produit not found" });
            }
            res.status(200).json(updatedProduit);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ProduitController;