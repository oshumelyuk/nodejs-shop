const Cart = require("../models/cart");
const Product = require("../models/product");

module.exports = {
    getCart: async (req, resp, next) => {
        const cart = await Cart.readCart(req.user.id);
        return resp.render("shop/cart", {
            title: "Cart",
            path: "/cart",
            cart: cart
        });
    },
    postAddProduct: async (req, resp, next) => {
        const id = req.params.id;
        const product = await Product.findByPk(id);
        if (product){
            await Cart.addProduct(req.user.id, product.id, product.price);
        }
        return resp.redirect("/cart");
    },
    deleteProduct: async(req, resp, next) => {
        const id = req.params.id;
        await Cart.removeProduct(req.user.id, id);
        return resp.redirect("/cart");
    }
};