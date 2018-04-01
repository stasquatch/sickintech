const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid email address"],
    required: "Please provide an email address"
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    validate: [
      validator.isAlphanumeric,
      "Please only alphanumeric characters."
    ],
    required: "Please provide a username"
  },
  created: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  bookmarks: [{ type: mongoose.Schema.ObjectId, ref: "Resource" }]
});

function autopopulate(next) {
  this.populate("bookmarks");
  next();
}

userSchema.pre("find", autopopulate);
userSchema.pre("findOne", autopopulate);

userSchema.plugin(passportLocalMongoose, { usernameField: "username" });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", userSchema);
