var express = require('express');
var router = express.Router();

var commandeRouter = require("./commandeRoute");
var commandeDetailRouter = require("./commandeDetailRoute");

router.use('/commandes' , commandeRouter) ;
router.use('/commandeDetails' , commandeDetailRouter) ;
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', message: 'Bienvenue sur Express' });
});

module.exports = router;