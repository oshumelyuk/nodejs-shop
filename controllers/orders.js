const Order = require("../models/order");

module.exports = {
  getOrders: async (req, resp, next) => {
    const orders = await Order.find({});
    return resp.render("shop/orders", {
      title: "Orders",
      path: "/orders",
      orders: orders
    });
  },
  postOrder: async (req, resp, next) => {
    const userWithProducts = await req.user
      .populate("cart.products.productId")
      .execPopulate();

    const products = userWithProducts.cart.products.map(p => ({
      productId: p.productId._id,
      quantity: p.quantity,
      productTitle: p.productId.title,
      productDescription: p.productId.description,
      productPrice: p.productId.price,
      productImageUrl: p.productId.imageUrl,
    }));
    var newOrder = new Order({
      createdAt: new Date(),
      userId: req.user._id,
      userName: req.user.name,
      userEmail: req.user.email,
      products: products,
      totalPrice: products.reduce((total, curr) => total + curr.quantity * curr.productPrice, 0)
    });
    console.log(newOrder);
    await newOrder.save();
    await req.user.clearCart();
    return resp.render("shop/orders", {
      title: "Orders",
      path: "/orders"
    });
  }
};
