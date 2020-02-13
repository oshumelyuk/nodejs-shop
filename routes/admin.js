const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const {checkAdmin} = require("../middleware/auth");

router.get("/products", checkAdmin, productsController.getAdminProducts);
router.get("/product", checkAdmin, productsController.getAddProduct);
router.get("/product/:id", checkAdmin, productsController.getAddProduct);
router.post("/product", checkAdmin, productsController.postAddProduct);
router.post("/product/:id", checkAdmin, productsController.postAddProduct);
router.delete("/product/:id", checkAdmin, productsController.deleteProduct);
module.exports = router;