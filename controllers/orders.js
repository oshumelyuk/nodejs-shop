const Order = require("../models/order");

module.exports = {
    getOrders: async (req, resp, next) => {
        console.log("orders view");
        const orders = await Order.findAll(req.user.id);
        return resp.render("shop/orders", {
            title: "Orders",
            path: "/orders",
            orders: orders
        })
    },
    postOrder: async (req, resp, next) => {
        console.log("post order");
        var newOrder = new Order(req.user.id, req.user.cart.products);
        await newOrder.save();
        await req.user.clearCart();
        return resp.render("shop/orders", {
            title: "Orders",
            path: "/orders"
        });
    }
};