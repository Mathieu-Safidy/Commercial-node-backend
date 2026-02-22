const router = require('express').Router();
const CategorieController = require('../controllers/categorieController');

router.get('/', CategorieController.getAllCategories);

module.exports = router;