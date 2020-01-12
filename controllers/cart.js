const Product = require("../models/product");
const User = require("../models/user");

module.exports = {
    getCart: async (req, resp, next) => {
        const user = await User.getById(req.user.id);
        const products = [];
        let totalPrice = 0;
        if (user && user.cart && user.cart.products){
            for (var p of user.cart.products){
                let productInfo = await Product.getById(p.productId);
                products.push({...p, info: productInfo});
                totalPrice += productInfo.price * p.quantity;
            }
        }
        return resp.render("shop/cart", {
            title: "Cart",
            path: "/cart",
            cart: {products, totalPrice}
        });
    },
    postAddProduct: async (req, resp, next) => {
        const id = req.params.id;
        const product = await Product.getById(id);
        if (product){
            await req.user.addToCart(product);
        }
        return resp.redirect("/cart");
    },
    deleteProduct: async(req, resp, next) => {
        const id = req.params.id;
        await req.user.removeFromCart(id);
        return resp.redirect("/cart");
    }
};