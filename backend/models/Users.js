// models/Users.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// The password is hashed for security reasons prior to saving the user.
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

// Generate JWT token for authentication
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "your-secret-key"); // Replace "your-secret-key" with a secret key for JWT
  return token;
};

module.exports = mongoose.model("User", userSchema);
