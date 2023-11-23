const express = require("express");
const { getProducts } = require("../controllers/productController");
const router = express.Router();
router.get('/product/:categoria', getProducts);
module.exports = router;
