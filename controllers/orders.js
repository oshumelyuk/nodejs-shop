const Order = require("../models/order");

module.exports = {
  getOrders: async (req, resp, next) => {
    const userId = req.session.userId;
    const orders = await Order.find({userId : userId});
    return resp.render("shop/orders", {
      title: "Orders",
      path: "/orders",
      isAuthN: req.session.isAuthN,
      isAdmin: req.session.isAdmin,
      orders: orders
    });
  },
  postOrder: async (req, resp, next) => {
    const currentUser = req.user;
    const userWithProducts = await currentUser
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
      userId:  currentUser._id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      products: products,
      totalPrice: products.reduce((total, curr) => total + curr.quantity * curr.productPrice, 0)
    });
    await newOrder.save();
    await currentUser.clearCart();
    return resp.render("shop/orders", {
      title: "Orders",
      path: "/orders",
      isAuthN: req.session.isAuthN,
      isAdmin: req.session.isAdmin,
    });
  }
};
