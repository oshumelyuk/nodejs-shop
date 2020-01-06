module.exports = {
    getCheckout: (req, resp, next) => {
        return resp.render("shop/checkout", {
            title: "checkout",
            path: "/checkout"
        });
    },
}