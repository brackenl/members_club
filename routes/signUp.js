var express = require("express");
var bcrypt = require("bcrypt");
const { body, check, validationResult } = require("express-validator");

var User = require("../models/user");

var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("sign_up");
});

router.post(
  "/",
  [
    check("password").exists(),
    check("confirmPassword", "Password and confirmed password must match")
      .exists()
      .custom((value, { req }) => value === req.body.password),
  ],

  body("firstName", "First name required").trim().isLength({ min: 1 }).escape(),
  body("surname", "Surname required").trim().isLength({ min: 1 }).escape(),
  body("email").normalizeEmail().isEmail().withMessage("Valid email required"),
  body("password", "Password required").trim().isLength({ min: 1 }).escape(),

  function (req, res, next) {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    let user;
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      user = new User({
        username: req.body.email,
        first_name: req.body.firstName,
        last_name: req.body.surname,
        password: hashedPassword,
        member: false,
      });
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      res.render("sign_up", {
        user: user,
        errors: errors.array(),
      });
      return;
    } else {
      user.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    }
  }
);

module.exports = router;
