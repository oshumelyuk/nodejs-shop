const express = require("express");
const session = require("express-session");
const MongoDbSessionStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const { port, database, sessionSecret } = require("./utils/config");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorsController = require("./controllers/errors");
const User = require("./models/user");

const MONGO_DB_URI = `mongodb+srv://${database.login}:${database.pwd}@cluster0-230jr.mongodb.net/${database.name}`;
const app = express();
const store = new MongoDbSessionStore({
  uri: MONGO_DB_URI,
  collection: "sessions"
});

app.set("view engine", "pug");
app.set("views", path.join("views", "pugEngine"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: sessionSecret, resave: false, saveUninitialized: false, store: store }));

app.use(async (req, resp, next)=>{
  if (req.session.isAuthN){
    req.user = await User.findById(req.session.userId);
  }
  await next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorsController.get404);

mongoose.connect(
  MONGO_DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on("open", () => {
  app.listen(port ? port : 3000);
});
