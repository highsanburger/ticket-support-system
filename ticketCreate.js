// ticketCreate.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const feedbackSchema = new mongoose.Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const ticketSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  productType: String,
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  currentstatus: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  notes: [noteSchema],
  feedbacks: [feedbackSchema],
});

module.exports = mongoose.model("Ticket", ticketSchema, "createTicket");
