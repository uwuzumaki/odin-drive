const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../db/queries");
const passport = require("passport");

const index = (req, res) => {
  if (req.user) {
    res.redirect(`/user`);
  } else {
    res.render("index", { locals: res.locals });
  }
};

const registerGet = (req, res) => {
  res.render("registerGet");
};

const registerPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await db.newUser(req.body.username, hashedPassword);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

const loginPost = passport.authenticate("local", {
  successRedirect: "/user",
  failureRedirect: "/login",
});

const logout = (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);
    req.session.destroy((error) => {
      if (error) return next(error);
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
};

module.exports = {
  index,
  registerGet,
  registerPost,
  loginPost,
  logout,
};
