const Product = require('../models/product');

module.exports = {
    getAddProduct: (req, resp, next) => {
        resp.render("product", {
            title: "Add Product",
            path: "/admin/products",
            activeAddProducts: true
        });
    },
    postAddProduct: async (req, resp, next) => {
        const { title } = req.body;
        const product = new Product(title);
        await product.save();
        resp.redirect("/");
    },
    getProducts: async (req, resp, next) => {
        const products = await Product.fetchAll();
        resp.render('shop', {
            products: products,
            hasProducts: products.length > 0,
            activeShop: true,
            title: "Shop",
            path: "/"
        });
    }
}