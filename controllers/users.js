const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = {
    getLogin: async (req, resp, next) => {
        if (req.session.isAuthN){
            return resp.redirect("/products");
        }
        return resp.render("login", {
            title: "Log In",
            path: "/login",
            isAuthN: req.session.isAuthN,
            isAdmin: req.session.isAdmin,
        })
    },
    postLogin: async (req, resp, next) => {
        const {password, login} = req.body;
        if (password && login){
            const user = await User.findOne({ email: login});
            if (user && await bcrypt.compare(password, user.pwdHash)){
                req.session.isAuthN = true;
                req.session.userId = user.id;
                req.session.isAdmin = user.role === "admin";
                await req.session.save();
                return resp.redirect("/products");
            }
        }
        return resp.render("login", {
            title: "Log In",
            path: "/login",
            isAuthN: req.session.isAuthN,
            data: {
                login: login,
                password: password,
                error: 'Login or password is incorrect'
            }
        });
    },
    getSignup: async (req, resp, next) => {
        return resp.render("signup", {
            title: "Sign Up",
            path: "/signup",
            isAuthN: req.session.isAuthN,
            isAdmin: req.session.isAdmin,
        })
    },
    postSignup: async (req, resp, next) => {
        const {password, confirmPassword, email, name} = req.body;
        if (password === confirmPassword && email){
            const existingUser = await User.findOne({ email: email});
            if (!existingUser){
                const pwdHash = await bcrypt.hash(password, 12);
                const newUser = new User({
                    email,
                    name,
                    pwdHash,
                });
                await newUser.save();
                req.session.isAuthN = true;
                req.session.userId = newUser.id;
                await req.session.save();
                return resp.redirect("/products");
            }
        }
        return resp.render("login", {
            title: "Log In",
            path: "/login",
            isAuthN: req.session.isAuthN,
            isAdmin: req.session.isAdmin,
            data: {
                login: login,
                password: password,
                error: 'Login or password is incorrect'
            }
        });
    },
    postLogout: async(req, resp, next) =>{
        await req.session.destroy();
        return resp.redirect("/login");
    }
};