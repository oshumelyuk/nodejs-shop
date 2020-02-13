module.exports = {
    checkAuthUser: async (req, resp, next) => {
        if(req.session.isAuthN){
            await next();
            return;
        }
        return resp.redirect("/login");
    },
    checkAdmin: async (req, resp, next) => {
        if(req.session.isAuthN && req.session.isAdmin){
            await next();
            return;
        }
        return resp.redirect("/login");
    }
}