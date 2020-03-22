const express = require("express");
const session = require("express-session");
const MongoDbSessionStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const csrf = require('csurf');
const multer = require('multer');

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
const csrfProtection = csrf();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/products');
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + '_' + file.originalname);
  }
})
const imageFilter = (req, file, cb) =>{
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
    cb(null, true);
  } else{
    cb(null, false);
  }
};

app.set("view engine", "pug");
app.set("views", path.join("views", "pugEngine"));

app.use("/500", errorsController.get500);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ storage: storage, fileFilter: imageFilter }).single("image"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(session({ secret: sessionSecret, resave: false, saveUninitialized: false, store: store }));
app.use(csrfProtection);
app.use(async (req, resp, next)=>{
  if (req.session.isAuthN){
    req.user = await User.findById(req.session.userId);
  }
  await next();
});

app.use(async (req, resp, next) => {
  resp.locals.isAuthN = req.session.isAuthN;
  resp.locals.isAdmin = req.session.isAdmin;
  resp.locals.csrfToken = req.csrfToken();
  await next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorsController.get404);
app.use((err, req, resp, next) => {
  console.log(err);
  resp.redirect("/500");
});
mongoose.connect(
  MONGO_DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on("open", () => {
  app.listen(port ? port : 3000);
});
