// createRoutes.js
const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticketCreate");
const User = require("../models/user");

router.post("/create", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      productType,
      description,
      userId,
      currentstatus,
    } = req.body;

    const createdAt = new Date();
    const employee = await User.findOne({
      userType: "employee",
      specialization: productType,
    });

    if (!employee) {
      return res.status(404).json({
        message: "No employee found with the required specialization",
      });
    }

    const newTicket = new Ticket({
      customerName,
      customerEmail,
      productType,
      description,
      userId,
      currentstatus,
      assignedTo: employee._id,
      createdAt,
    });

    const savedTicket = await newTicket.save();

    res.status(201).json(savedTicket);
  } catch (error) {
    console.error("Error creating ticket", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const userTickets = await Ticket.find({ userId });
    console.log(userTickets);
    res.status(200).json(userTickets);
  } catch (error) {
    console.error("Error fetching user's tickets", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:ticketId/details", async (req, res) => {
  try {
    const ticketId = req.params.ticketId;

    const ticketDetails = await Ticket.findById(ticketId);

    if (!ticketDetails) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticketDetails);
  } catch (error) {
    console.error("Error fetching ticket details", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:ticketId/delete", async (req, res) => {
  try {
    const ticketId = req.params.ticketId;

    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:ticketId/add-note", async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const { content } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.notes.push({
      content,
      createdAt: new Date(),
    });

    const updatedTicket = await ticket.save();

    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error("Error adding note to ticket", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/:ticketId/add-feedback", async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const { content } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.feedbacks.push({
      content,
      createdAt: new Date(),
    });

    const updatedTicket = await ticket.save();

    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error("Error adding response to ticket", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Assuming your route looks something like this
router.patch("/:ticketId/update-status", async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const newStatus = req.body.newStatus;
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { currentstatus: newStatus },
      { new: true }
    );
    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error("Error updating ticket status", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
