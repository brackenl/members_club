var express = require("express");
var router = express.Router();

var signUpRouter = require("./signUp");
var logInRouter = require("./logIn");
var logOutRouter = require("./logOut");
var joinClubRouter = require("./joinClub");
var messageRouter = require("./message");

var Message = require("../models/message");

router.get("/", function (req, res, next) {
  Message.find({})
    .populate("user")
    .exec(function (err, messages) {
      res.render("index", { messages: messages });
    });
});

router.use("/sign-up", signUpRouter);
router.use("/log-in", logInRouter);
router.use("/log-out", logOutRouter);
router.use("/join-club", joinClubRouter);
router.use("/message", messageRouter);

module.exports = router;
