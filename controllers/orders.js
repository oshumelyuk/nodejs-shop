module.exports = {
    getOrders: (req, resp, next) => {
        console.log("orders view");
        return resp.render("shop/orders", {
            title: "Orders",
            path: "/orders"
        })
    },
};