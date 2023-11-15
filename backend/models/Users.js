const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  // tickets: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Ticket",
  //   },
  // ],
  // image: {
  //   type: String,
  // },
  // ticketProgress: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Ticket",
  //   },
  // ],
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model("User", userSchema);
