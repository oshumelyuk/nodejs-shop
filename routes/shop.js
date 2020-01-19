const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const cartController = require("../controllers/cart");
const ordersController = require("../controllers/orders");
const usersController = require("../controllers/users");
const {checkAuthUser} = require("../middleware/auth");

router.get("/cart", checkAuthUser, cartController.getCart);
router.get("/orders", checkAuthUser, ordersController.getOrders);
router.post("/order", checkAuthUser, ordersController.postOrder);
router.post("/cart/products/:id", checkAuthUser, cartController.postAddProduct);
router.delete("/cart/products/:id", checkAuthUser, cartController.deleteProduct);
router.get("/products", productsController.getProducts);
router.get("/products/:id", productsController.getProductDetails);
router.get("/signup", usersController.getSignup);
router.post("/signup", usersController.postSignup);
router.get("/login", usersController.getLogin);
router.post("/login", usersController.postLogin);
router.post("/logout", checkAuthUser, usersController.postLogout);
router.get("/", usersController.getLogin);
module.exports = router;


