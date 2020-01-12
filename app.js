const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorsController = require("./controllers/errors");

const db = require("./utils/database");
const User = require("./models/user");
const Product = require("./models/product");
const CartItem = require("./models/cartItem");
const OrderItem = require("./models/orderItem");
const Order = require("./models/order");
const Session = require("./utils/session");

app.set("view engine", "pug");
app.set("views", path.join("views", "pugEngine"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, resp, next) => {
    Session.getCurrentUser().then((user) => {
        req.user = user;
        return next();
    })
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorsController.get404);

CartItem.belongsTo(User);
CartItem.belongsTo(Product);
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});


db
.sync()
.then(() => {
    return User.findByPk(1);
})
.then((existingUser) => {
    if (existingUser){
        return Promise.resolve(existingUser);
    }
    return User.create({
        name: "Olha", 
        email: "olha@github.com"
    });
})
.then((user) =>{
    app.listen(3000);
});
