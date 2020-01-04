const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressHbs = require("express-handlebars");
const app = express();
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// app.engine('hbs', expressHbs({layoutsDir: "views/handlebarsEngine/", defaultLayout: "mainLayout", extname: "hbs"}));
// app.set("view engine", "hbs");
// app.set("views", path.join("views", "handlebarsEngine"));
app.set("view engine", "ejs");
app.set("views", path.join("views", "ejsEngine"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminData.router);
app.use(shopRoutes);

app.use((req, resp, next) => {
    console.log("all products", adminData.products);
    resp.status(404).render("404", {title: "Page Not Found", path: undefined}); //.sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);