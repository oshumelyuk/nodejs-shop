module.exports = {
    getCart: (req, resp, next) => {
        return resp.render("shop/cart", {
            title: "Cart",
            path: "/cart"
        });
    },
    postAddProduct: (req, resp, next) => {
        console.log("add product to cart")
        return resp.redirect("/shop/products");
    },
};