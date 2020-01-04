const express = require("express");
const router = express.Router();
const path = require("path");
const adminData = require("./admin");

router.get("/", (req, resp, next) => {
    resp.render('shop', { 
        products: adminData.products, 
        hasProducts: adminData.products.length > 0, 
        activeShop: true,
        title: "Shop", 
        path: "/" });
    // resp.sendFile(path.join(__dirname, '../', "views", "shop.html"));
});

module.exports = router;


