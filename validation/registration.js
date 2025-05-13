const { body } = require("express-validator");

module.exports = registrationValidator = [
  body("password")
    .trim()
    .escape()
    .isLength({ min: 8, max: 64 })
    .withMessage("Password must be between 8 and 64 characters long"),
  body("confirm-password").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];
