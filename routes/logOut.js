var express = require("express");
// const passport = require("passport");

var router = express.Router();

router.get("/", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
