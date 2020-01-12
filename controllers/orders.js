const Cart = require("../models/cart");
const OrderItem = require("../models/orderItem");

module.exports = {
    getOrders: async (req, resp, next) => {
        const orders = await req.user.getOrders();
        return resp.render("shop/orders", {
            title: "Orders",
            path: "/orders",
            orders: orders
        })
    },
    postOrder: async (req, resp, next) => {
        const cart = await Cart.readCart(req.user.id);
        if (cart){
            const totalPrice = cart.products.reduce((prev, curr) => curr.qty * curr.info.price, 0);
            const order = await req.user.createOrder({
                totalPrice: totalPrice
            });
            for(let product of cart.products){
                await OrderItem.create({
                    orderId: order.id,
                    productId: product.productId,
                    quantity: product.qty
                });
            };
            Cart.destroyCart(req.user.id);
        }
        return resp.render("shop/orders", {
            title: "Orders",
            path: "/orders"
        })
    },
};