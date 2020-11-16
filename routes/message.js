var express = require("express");
const { body, validationResult } = require("express-validator");
const { render } = require("../app");

var Message = require("../models/message");

var router = express.Router();

router.get("/", function (req, res, next) {
  if (!req.user) {
    res.render("index", { text: "You must be signed in to create a message" });
  } else {
    res.render("message_form");
  }
});

router.post(
  "/",
  body("title", "Title required").trim().isLength({ min: 1 }).escape(),
  body("messageText", "Message text required")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  function (req, res, next) {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    var message = new Message({
      title: req.body.title,
      text: req.body.messageText,
      timestamp: new Date(),
      user: req.user,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      res.render("message_form", {
        message: message,
        errors: errors.array(),
      });
      return;
    } else {
      message.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    }
  }
);

router.delete("/:id", function (req, res, next) {
  console.log(req.params);
  Message.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      console.log(err);
    }
  });
  Message.find({}, function (err, messages) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { messages: messages });
    }
  });
});

module.exports = router;
