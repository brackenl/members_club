require("dotenv").config();
var bcrypt = require("bcrypt");

var User = require("./models/user");
var Message = require("./models/message");

var mongoose = require("mongoose");
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var user;

bcrypt.hash("password", 10, (err, hashedPassword) => {
  user = new User({
    username: "test@test.com",
    first_name: "test",
    last_name: "user",
    password: hashedPassword,
    member: false,
  });

  user.save(function (err) {
    if (err) {
      console.log(err);
    }
    console.log("New user: ", user);
  });

  var message = new Message({
    title: "First message",
    text: "Here is the message",
    timestamp: new Date(),
    user: user,
  });

  message.save(function (err) {
    if (err) {
      console.log(err);
    }
    console.log("New message: ", message);
  });
});
