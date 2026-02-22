const express = require("express");
const router = express.Router();
const StockController = require("../controllers/stockController");

router.post("/approvisionner", StockController.addStock);
router.post("/retirer", StockController.removeStock);
router.post("/ajuster", StockController.adjustStock);

module.exports = router;