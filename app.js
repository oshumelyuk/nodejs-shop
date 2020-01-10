const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorsController = require("./controllers/errors");
const mongoConnect = require('./utils/database').mongoConnect;

app.set("view engine", "pug");
app.set("views", path.join("views", "pugEngine"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorsController.get404);

mongoConnect().then(() => {
    app.listen(3000);
});