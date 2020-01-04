const express = require("express");
const path = require("path");
const router = express.Router();
const products = [];

router.get("/products", (req, resp, next) => {
    console.log("I'm users middleware!");
    console.log("all products: ", products);
    resp.render("product", {
        title: "Add Product",
        path: "/admin/products",
        activeAddProducts: true
    });
    // resp.sendFile(path.join(__dirname, "../", "views", "product.html"));
});

router.post("/products", (req, resp, next) => {
    const { product } = req.body;
    products.push({ title: product });
    console.log(`new product is ${product}`);
    resp.redirect("/");
});

module.exports.router = router;
module.exports.products = products;