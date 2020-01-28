const Product = require("../models/product");

module.exports = {
  getCart: async (req, resp, next) => {
    const userWithProducts = await req.user
      .populate("cart.products.productId")
      .execPopulate();
    const products = userWithProducts.cart.products
      ? userWithProducts.cart.products.map(p => ({
          productId: p.productId._id,
          quantity: p.quantity,
          info: p.productId,
        }))
      : [];

    let totalPrice =
      products.length > 0
        ? products.reduce(
            (total, curr) => total + curr.quantity * curr.info.price
          , 0)
        : 0;

    return resp.render("shop/cart", {
      title: "Cart",
      path: "/cart",
      cart: { products, totalPrice }
    });
  },
  postAddProduct: async (req, resp, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      await req.user.addToCart(product);
    }
    return resp.redirect("/cart");
  },
  deleteProduct: async (req, resp, next) => {
    const id = req.params.id;
    await req.user.removeFromCart(id);
    return resp.redirect("/cart");
  }
};
