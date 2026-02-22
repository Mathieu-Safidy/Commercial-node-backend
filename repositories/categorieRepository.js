const categorieModel = require("../models/categorieModele");
class CategorieRepository {

    constructor( ) {

    }
    static async getAllCategories() {
        return await categorieModel.find();
    }
}

module.exports = CategorieRepository;