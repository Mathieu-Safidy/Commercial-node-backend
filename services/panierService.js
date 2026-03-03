const PanierRepository = require("../repositories/panierRepository");
const PanierDetailRepository = require("../repositories/panierDetailRepository");
const ProduitRepository = require("../repositories/produitRepository");
const BoutiqueRepository = require("../repositories/boutiqueRepository");
class PanierService {
  static getAllPaniers = async () => {
    const paniers = await PanierRepository.getAllPaniers();
    for (const panier of paniers) {
      panier.details = await PanierDetailRepository.getPanierDetailsByPanierId(
        panier._id,
      );
    }
    return paniers;
  };
  static getPanierActifByIdUser = async (idUser) => {
    const panier = await PanierRepository.getPanierActifByIdUser(idUser);
    if (panier) {
      panier.details = await PanierDetailRepository.getPanierDetailsByPanierId(
        panier._id,
      );
    console.log("Panier ::: " , panier) ; 
      if (panier.details) {
        panier.details = await Promise.all(
          panier.details.map(async (detail) => {
            let rest = { ...detail.toObject() };
            let produit = await ProduitRepository.getProduitById(
              detail.idProduit,
            );
            console.log("produit :: " ,  produit); 
            produit.boutique = await BoutiqueRepository.getBoutiqueById(
              produit.idBoutique,
            );
            return { ...rest, produit };
          }),
        );
         
      }
    }
    return panier;
  };
  static getPanierTermineByIdUser = async (idUser) => {
    const paniers = await PanierRepository.getPanierTermineByIdUser(idUser);

    return Promise.all(
      paniers.map(async (panier) => {
        let details = await PanierDetailRepository.getPanierDetailsByPanierId(
          panier._id,
        );

        details = await Promise.all(
          details.map(async (detail) => {
            const produit = await ProduitRepository.getProduitById(
              detail.idProduit,
            );
            produit.boutique = await BoutiqueRepository.getBoutiqueById(
              produit.idBoutique,
            );

            return {
              ...detail.toObject(),
              produit,
            };
          }),
        );

        const quantiteTotal = details.reduce(
          (total, d) => total + d.quantite,
          0,
        );

        const total = details.reduce(
          (total, d) => total + d.quantite * d.produit.prixInitial,
          0,
        );

        return {
          ...panier.toObject(),
          details,
          quantiteTotal,
          total,
        };
      }),
    );
  };
  static createPanier = async (panier) => {
    const newPanier = await PanierRepository.savePanier(panier);
    return newPanier;
  };
  static addDetailToPanier = async (panierId, detail) => {
    detail.idPanier = panierId;
    const newDetail = await PanierDetailRepository.savePanierDetail(detail);
    return newDetail;
  };
  static addToPanier = async (idUser, detail) => {
    let panier = await PanierRepository.getPanierActifByIdUser(idUser);
    if (!panier) {
      panier = await PanierRepository.savePanier({ idUser });
    } else {
      let panierDetail =
        await PanierDetailRepository.getPanierDetailsByPanierId(panier._id);
      let existingDetail = panierDetail.some(
        (d) => d.idProduit.toString() === detail.idProduit,
      );
      panier.details = panierDetail;
      if (existingDetail) {
        return panier;
      }
    }
    const updatedPanier = await PanierService.addDetailToPanier(
      panier._id,
      detail,
    );
    let panierRetour = await PanierRepository.getPanierActifById(
      updatedPanier.idPanier,
    );
    return panierRetour;
  };
  static deleteDetailFromPanier = async (id) => {
    const deletedDetail = await PanierDetailRepository.deletePanierDetail(id);
    return deletedDetail;
  };
  static modifyDetailFromPanier = async (id, detail) => {
    let detailModif = { ...detail };
    const updatedDetail = await PanierDetailRepository.updatePanierDetail(
      id,
      detailModif,
    );
    return updatedDetail;
  };

  static validerPanier = async (id) => {
    const panierValide = await PanierRepository.validerPanier(id);
    return panierValide;
  };
}

module.exports = PanierService;
