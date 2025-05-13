const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../db/queries");

const index = (req, res) => {
  res.render("index");
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
    console.log(user);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

const loginGet = (req, res) => {
  res.render("loginGet");
};

module.exports = {
  index,
  registerGet,
  loginGet,
  registerPost,
};
