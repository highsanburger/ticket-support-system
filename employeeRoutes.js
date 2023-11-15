// employeeRoutes.js
const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticketCreate"); // Make sure to adjust the path to your Ticket model

// Route to get tickets assigned to a particular employee
router.get("/:userId/tickets", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Assuming tickets are associated with users through the userId field
    const employeeTickets = await Ticket.find({ assignedTo: userId });

    res.status(200).json(employeeTickets);
  } catch (error) {
    console.error("Error fetching employee tickets", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add more routes for employee-related operations as needed

module.exports = router;
