const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');

module.exports = {
    getLogin: async (req, resp, next) => {
        if (req.session.isAuthN) {
            return resp.redirect("/products");
        }
        return resp.render("login", {
            title: "Log In",
            path: "/login",
        })
    },
    postLogin: async (req, resp, next) => {
        var error = validationResult(req);
        if (!error.isEmpty()) {
            resp.render("login", {
                title: "Log In",
                path: "/login",
                data: {
                    login: req.body.login,
                    password: req.body.password,
                    error: error.array()[0].msg
                }
            });
        }
        const { password, login } = req.body;
        if (password && login) {
            const user = await User.findOne({ email: login });
            if (user && await bcrypt.compare(password, user.pwdHash)) {
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
        })
    },
    postSignup: async (req, resp, next) => {
        const { password, confirmPassword, email, name } = req.body;
        var error = validationResult(req);
        if (!error.isEmpty()) {
            return resp.render("signup", {
                title: "Sign up",
                path: "/signup",
                data: {
                    email,
                    name,
                    password,
                    confirmPassword,
                    error: error.array()[0].msg
                }
            });
        }

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
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
        return resp.render("login", {
            title: "Log In",
            path: "/login",
            data: {
                login: login,
                password: password,
                error: 'Login or password is incorrect'
            }
        });
    },
    postLogout: async (req, resp, next) => {
        await req.session.destroy();
        return resp.redirect("/login");
    }
};