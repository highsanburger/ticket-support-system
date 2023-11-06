const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Remove leading/trailing white spaces
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "Pending", "Resolved"],
    default: "Open",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  // createdBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User", // Reference to the user who created the ticket
  // },
  // assignedTo: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User", // Reference to the user who is assigned to the ticket
  // },
});

module.exports = mongoose.model("Ticket", ticketSchema);
