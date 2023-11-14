const express = require("express");
const app = express(); // actual api
const PORT = process.env.PORT || 8080;

// server is not configured to allow such requests due to the same-origin policy.
const cors = require("cors");
app.use(cors());

// Mongo

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/ticket-system", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Import models
const Ticket = require("./models/Tickets");
const User = require("./models/Users");

// Express
app.use(express.json()); // middleware to parse json

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));

const ticketRouter = require("./routes/ticket"); // Require the router without middleware

app.use("/ticket", ticketRouter); // Use the router without passing any middleware
// Use your models as needed in your routes and route handlers
