var express = require('express');
const panierController = require('../controllers/panierController');
var router = express.Router();

router.get('/paniers', panierController().getAllPaniers);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', message: 'Bienvenue sur Express' });
});


module.exports = router;