const Product = require('../models/product');

module.exports = {
    getAddProduct: async (req, resp, next) => {
        var id = req.params.id;
        const product = id && await Product.findByPk(id);
        return resp.render('admin/edit-product', {
            title: product ? product.title : "Add Product",
            path: "/admin/product",
            product: product
        });
    },
    postAddProduct: async (req, resp, next) => {
        id = req.params.id;
        const { title, imageUrl, description, price } = req.body;
        if (!id){
            await Product.create({
                title,
                imageUrl,
                description,
                price
            });
        } else {
            await Product.update({
                title,
                description,
                imageUrl,
                price
              }, {
                where: {
                  id: id
                }
              });
        }
        resp.redirect("/admin/products");
    },
    getProducts: async (req, resp, next) => {
        const products = await Product.findAll();
        resp.render('shop/products-list', {
            products: products,
            hasProducts: products.length > 0,
            activeShop: true,
            title: "All products",
            path: "/products"
        });
    },
    getAdminProducts: async (req, resp, next) =>{
        const products = await Product.findAll();
        resp.render('admin/products', {
            products: products,
            hasProducts: products.length > 0,
            activeShop: true,
            title: "Admin products",
            path: "/admin/products"
        });
    },
    deleteProduct: async(req, resp, next) => {
        const id = req.params.id;
        var product = await Product.findByPk(id);
        if (product){
            product.destroy();
        }
        return resp.redirect("/admin/products");
    },
    getProductDetails: async(req, resp, next) => {
        const id = req.params.id;
        const product = await Product.findByPk(id);
        return resp.render('shop/product-details', {
            title: product.title,
            path: "/products",
            product: product
        });
    },
}