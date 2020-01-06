module.exports = {
    getLanding: (req, resp, next) => {
        return resp.render("shop/index", {
            title: "Shop",
            path: "/"
        });
    },
}