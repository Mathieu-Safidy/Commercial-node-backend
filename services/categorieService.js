const CategoriRepository = require("../repositories/categorieRepository");
class CategorieService {
    static async getAllCategories() {
        return await CategoriRepository.getAllCategories();
    }
}

module.exports = CategorieService;