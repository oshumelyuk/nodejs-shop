const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const {port, database} = require("./utils/config");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorsController = require("./controllers/errors");
const User = require("./models/user");

app.set("view engine", "pug");
app.set("views", path.join("views", "pugEngine"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

let userId;
app.use((req, resp, next) => {
  User.findById(userId).then(user => {
    req.user = user;
    next();
  });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorsController.get404);

mongoose.connect(
  `mongodb+srv://${database.login}:${database.pwd}@cluster0-230jr.mongodb.net/${database.name}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on("open", () => {
  User.findOne()
    .then(user => {
      if (!user) {
        return new User({
          name: "Olha",
          email: "olha@github.com",
          cart: { products: [] }
        }).save();
      }
      return Promise.resolve(user);
    })
    .then(user => {
      userId = user._id;
      app.listen(port ? port : 3000);
    });
});
