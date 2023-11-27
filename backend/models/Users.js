const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  // accountType: {
  //   type: String,
  // enum: ["Admin", "User"],
  // required: true,
  // },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// The password is hashed for security reasons prior to saving the user.
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
