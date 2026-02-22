const CategorieService = require("../services/categorieService");
class CategorieController {
    static async getAllCategories(req, res) {
        try {
            const categories = await CategorieService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = CategorieController;