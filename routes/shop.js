const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const cartController = require("../controllers/cart");
const landingController = require("../controllers/landing");
const ordersController = require("../controllers/orders");

router.get("/cart", cartController.getCart);
router.get("/orders", ordersController.getOrders);
router.post("/order", ordersController.postOrder);
router.post("/cart/products/:id", cartController.postAddProduct);
router.delete("/cart/products/:id", cartController.deleteProduct);
router.get("/products", productsController.getProducts);
router.get("/products/:id", productsController.getProductDetails)
router.get("/", landingController.getLanding);
module.exports = router;


