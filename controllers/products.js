const Product = require('../models/product');

module.exports = {
    getAddProduct: async (req, resp, next) => {
        var id = req.params.id;
        if (!id) {
            return resp.render("admin/add-product", {
                title: "Add Product",
                path: "/admin/product",
            });
        }
        const product = await Product.getById(id);
        return resp.render('admin/edit-product', {
            title: product.title,
            path: "/admin/products",
            product: product
        });
    },
    postAddProduct: async (req, resp, next) => {
        id = req.params.id;
        const { title, imageUrl, description, price } = req.body;
        const product = new Product(title, imageUrl, description, price);
        product.id = id;
        await product.save();
        resp.redirect("/admin/products");
    },
    getProducts: async (req, resp, next) => {
        const products = await Product.fetchAll();
        resp.render('shop/products-list', {
            products: products,
            hasProducts: products.length > 0,
            activeShop: true,
            title: "All products",
            path: "/products"
        });
    },
    getAdminProducts: async (req, resp, next) =>{
        const products = await Product.fetchAll();
        resp.render('admin/products', {
            products: products,
            hasProducts: products.length > 0,
            activeShop: true,
            title: "Admin products",
            path: "/admin/products"
        });
    },
    deleteProduct: async(req, resp, next) => {
        console.log("Delete product");
        const id = req.params.id;
        await Product.delete(id);
        return resp.redirect("/admin/products");
    },
    getProductDetails: async(req, resp, next) => {
        const id = req.params.id;
        const product = await Product.getById(id);
        return resp.render('shop/product-details', {
            title: product.title,
            path: "/products",
            product: product
        });
    },
}