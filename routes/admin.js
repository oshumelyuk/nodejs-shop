const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

router.get("/products", productsController.getAdminProducts);
router.get("/product", productsController.getAddProduct);
router.get("/product/:id", productsController.getAddProduct);
router.post("/product", productsController.postAddProduct);
router.post("/product/:id", productsController.postAddProduct);
router.delete("/product/:id", productsController.deleteProduct);
module.exports = router;