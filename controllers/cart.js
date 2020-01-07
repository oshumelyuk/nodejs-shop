const Cart = require("../models/cart");
const Product = require("../models/product");

module.exports = {
    getCart: async (req, resp, next) => {
        const cart = await Cart.readCart();
        console.log("cart", cart);
        if (cart.products){
            for (var p of cart.products){
                let productInfo = await Product.getById(p.id);
                p.info = productInfo;
            }
        }
        return resp.render("shop/cart", {
            title: "Cart",
            path: "/cart",
            cart: cart
        });
    },
    postAddProduct: async (req, resp, next) => {
        const id = req.params.id;
        const product = await Product.getById(id);
        if (product){
            await Cart.addProduct(product.id, product.price);
        }
        console.log("add product to cart")
        return resp.redirect("/cart");
    },
};