var mongoose = require("mongoose");
var { format } = require("date-fns");

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  title: { type: String, required: true, maxlength: 50 },
  text: { type: String, required: true, maxlength: 100 },
  timestamp: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

// Virtual for message's URL
MessageSchema.virtual("url").get(function () {
  return "/message/" + this._id;
});

MessageSchema.virtual("formatted_time").get(function () {
  return format(new Date(this.timestamp), "dd MMMM yyyy ' at ' HH:mm");
});

//Export model
module.exports = mongoose.model("Message", MessageSchema);
