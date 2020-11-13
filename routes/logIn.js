var express = require("express");
const passport = require("passport");

var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("log_in");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureFlash: true,
  })
);

module.exports = router;
