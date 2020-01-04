const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

router.get("/products", productsController.getAddProduct);
router.post("/products", productsController.postAddProduct);

module.exports = router;