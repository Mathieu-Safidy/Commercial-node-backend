const StockRepository = require("../repositories/stockRepository");

class StockService {
  static async transactionStock(
    idProduit,
    quantity,
    type,
    entree = null,
    sortie = null,
  ) {
    const lastStock = await StockRepository.findLastStockByProduit(idProduit);
    console.log("last stock", lastStock);

    if (!lastStock) {
      if (type === "out") {
        throw new Error("Stock insuffisant");
      } else if (type === "adjustment") {
        throw new Error("Aucun stock trouvé pour ce produit");
      } else if (type === "in") {
        const newStock = {
          idProduit,
          quantitEntre: quantity,
          quantiteSortie: 0,
          quantiteDisponible: quantity,
          createdAt: new Date(),
          modifiedAt: null,
        };
        await StockRepository.create(newStock);
        return;
      }
    }

    let newStock = lastStock.toObject();
    delete newStock._id; 
    if (type === "in") {
      newStock.quantiteSortie = 0;
      newStock.quantiteDisponible = newStock.quantiteDisponible + quantity ; 
      newStock.quantity += quantity;
      newStock.quantitEntre = quantity;
      newStock.createdAt = new Date();
      await StockRepository.create(newStock);
    } else if (type === "out") {
      if (lastStock.quantity < quantity) {
        throw new Error("Stock insuffisant");
      }
      newStock.quantiteEntre = 0;
      newStock.quantiteDisponible = newStock.quantiteDisponible - quantity ; 
      newStock.quantity -= quantity;
      newStock.quantiteSortie = quantity;

      newStock.createdAt = new Date();
      await StockRepository.create(newStock);
    } else if (type === "adjustment") {
      newStock.modifiedAt = new Date();
      await StockRepository.update(lastStock._id, newStock);

      if (!quantity) quantity = lastStock.quantity;
      if (entree) {
        newStock.quantitEntre = entree;
      } else {
        newStock.quantitEntre = lastStock.quantitEntre;
      }
      if (sortie) {
        newStock.quantiteSortie = sortie;
      } else {
        newStock.quantiteSortie = lastStock.quantiteSortie;
      }
      newStock.quantity = quantity;
      newStock.createdAt = new Date();
      await StockRepository.create(newStock);
    } else {
      throw new Error("Type de transaction invalide");
    }
  }
}

module.exports = StockService;
