var express = require("express");
const passport = require("passport");
const { body, check, validationResult } = require("express-validator");
require("dotenv").config();

var User = require("../models/user");

var router = express.Router();

router.get("/", function (req, res, next) {
  if (req.user) {
    res.render("join_club");
  } else {
    res.render("index", { text: "You must be logged in to join the Club" });
  }
});

router.post(
  "/",
  body("password", "Enter the password").trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    if (req.body.password === process.env.CLUB_PASSWORD) {
      User.findById(req.user._id, function (err, user) {
        user.member = true;
        user.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
        res.render("index", { text: "Welcome to the Club" });
      });
    } else {
      res.render("join_club", { error: true });
    }
  }
);

module.exports = router;
