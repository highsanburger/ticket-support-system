const express = require("express");
const router = express.Router();
const Ticket = require("../models/Tickets");

const { requireAuth } = require("../middleware/Auth");

// Create a new ticket
router.post("/create", async (req, res) => {
  try {
    const { title, description, status, createdBy } = req.body;
    // const createdBy = req.user.email; // Assuming user information is attached to req.user
    const newTicket = await Ticket.create({
      title,
      description,
      status,
      createdBy,
    });
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a list of all tickets
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;

    // Check if a status filter is provided
    const filter = status ? { status } : {};

    const tickets = await Ticket.find(filter);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Define other CRUD routes such as fetching a single ticket, updating, and deleting

// get tickets by createdBy
router.get("/user/:createdBy", async (req, res) => {
  try {
    const createdBy = req.params.createdBy;
    const userTickets = await Ticket.find({ createdBy: createdBy });
    res.status(200).json(userTickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); // Fetching a Single Ticket:

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Updating a Ticket:

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // Data to update the ticket

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deleting a Ticket:

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(204).end(); // No content, successful deletion
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Updating a Ticket (PATCH):
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // Data to update the ticket

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
