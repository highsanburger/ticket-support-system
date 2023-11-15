// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  confirmPassword: String,
  userType: String,
  specialization: String,
});

module.exports = mongoose.model("User", userSchema, "People");
