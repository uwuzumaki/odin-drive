const path = require("path");
const express = require("express");
const passport = require("passport");
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const session = require("./session/session");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session());
app.use(passport.session());
require("./passport/passport");
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.user = req.session.passport ? req.user.id : null;
  next();
});

app.use("/", authRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
