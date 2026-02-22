const Stock = require('../models/stockModel');
const Produit = require('../models/produitModel');

class StockRepository {
    static async create(data) {
        return Stock.create(data);
    }
    static async findAll() {
        return Stock.find().populate('idProduit');
    }
    static async findByIdProduit(idProduit) {
        return Stock.findOne({ idProduit }).populate('idProduit');
    }
    static async findLastStockByProduit(idProduit) {
        return Stock.findOne({ idProduit }).sort({ createdAt: -1 }).populate('idProduit');
    }
    static async findById(id) {
        return Stock.findById(id).populate('idProduit');
    }
    static async update(id, data) {
        return Stock.findByIdAndUpdate(id, data, { new: true });
    }
    static async delete(id) {
        return Stock.findByIdAndDelete(id);
    }

}
module.exports = StockRepository;