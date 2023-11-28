// models/Users.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail, isStrongPassword } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email Required"],
    validate: [isEmail, "Email Invalid"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password Required"],
    validate: [isStrongPassword, "Password Weak"], //{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// The password is hashed prior to saving the user.
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("User", userSchema);
