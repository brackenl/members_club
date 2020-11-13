var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  last_name: { type: String, required: true, maxlength: 100 },
  username: { type: String, required: true, maxlength: 100, unique: true },
  password: { type: String, required: true, maxlength: 100 },
  member: { type: Boolean, required: true },
});

// Apply the uniqueValidator plugin to UserSchema.
UserSchema.plugin(uniqueValidator);

// Virtual for full name
UserSchema.virtual("name").get(function () {
  return this.first_name + " " + this.last_name;
});

// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  return "/user/" + this._id;
});

//Export model
module.exports = mongoose.model("User", UserSchema);
