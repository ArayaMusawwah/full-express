//utilities module
const { requireLogin } = require("./utils/utilities");

//config express
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 8080;

//config experss layout
app.set("view engine", "ejs");
const expressLayout = require("express-ejs-layouts");
app.use(expressLayout);
app.set("layout", "./layouts/main-layout.ejs");

//config morgan
const morgan = require("morgan");
app.use(morgan("dev"));

//method Override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//config Session
const session = require("express-session");
app.use(
  session({
    secret: "open-sesame",
    resave: false,
    saveUninitialized: false,
  }),
);

//config flash
const flash = require("connect-flash");
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessage = req.flash("flashMessage");
  next();
});

// Home View
app.get("/", (req, res) => {
  res.render("home", {
    title: "Homepage",
    session: req.session.user_id,
  });
});

//About view
app.get("/about", (_, res) => {
  res.render("about", {
    title: "About",
  });
});

//authentication views
const authRouter = require("./routers/authenticationRouter");
app.use("/", authRouter);

//Garments Views
const garmentsRouter = require("./routers/garmentsRouter");
app.use("/garments", requireLogin, garmentsRouter);

// Products Views
const productsRouter = require("./routers/productsRouter");
app.use("/products", requireLogin, productsRouter);

// Page not found
app.use("/", (_, res) => {
  res.send("Page not Found").status(404);
});

//Connect DB and listening to port
const connectDB = require("./db");
connectDB()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`listening on port: http://localhost:${PORT}`);
      });
    } catch (err) {
      console.log("Can't listen to port ", err);
    }
  })
  .catch((err) => {
    console.error("Can't connect to DB ", err);
  });
