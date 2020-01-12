const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorsController = require("./controllers/errors");
const mongoConnect = require('./utils/database').mongoConnect;
const User = require("./models/user");

app.set("view engine", "pug");
app.set("views", path.join("views", "pugEngine"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, resp, next)=>{
    User.getById("5e1b3af72b6ba004b1102f14").then((user) =>{
        req.user = user;
        next();
    })
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorsController.get404);

mongoConnect()
.then(()=>{
    return User.getById("5e1b3af72b6ba004b1102f14");
})
.then((existingUser)=>{
    if (!existingUser){
        let newUser = new User("Olha", "olha@github.com");
        return newUser.save();
    }
    return Promise.resolve(existingUser);
})
.then(() => {
    app.listen(3000);
});