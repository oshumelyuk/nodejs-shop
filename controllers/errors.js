module.exports = {
    get404 : async (req, resp, next) => {
        resp.status(404).render("404", {title: "Page Not Found", path: undefined}); 
        return Promise.resolve();
    }
}