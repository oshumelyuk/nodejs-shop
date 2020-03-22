const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const {checkAdmin} = require("../middleware/auth");
const validators = require("../validators/productValidators");

router.get("/products", checkAdmin, productsController.getAdminProducts);
router.get("/product", checkAdmin, productsController.getAddProduct);
router.get("/product/:id", checkAdmin, productsController.getAddProduct);
router.post("/product", checkAdmin, validators.productModelValidator, productsController.postAddProduct);
router.post("/product/:id", checkAdmin, validators.productModelValidator, productsController.postAddProduct);
router.delete("/product/:id", checkAdmin, productsController.deleteProduct);
module.exports = router;