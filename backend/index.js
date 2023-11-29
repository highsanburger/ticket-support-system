// Accessing .env
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

// Connection to MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));

// Initialize Express app
const express = require("express");
const app = express();

// Middleware

// add a body property to the req object
app.use(express.json());

// allow requests from other domains to access the resources on your server
const cors = require("cors");
app.use(
  cors({
    origin: "https://ticket-support-system-q1k0.onrender.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  }),
);

// manages cookie-based sessions or extracts data from cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// // Import models
// const Ticket = require("./models/Tickets");
// const User = require("./models/Users");

const userRoute = require("./routes/User");
const ticketRoute = require("./routes/Ticket");
// const authRoute = require("./routes/Auth");

app.use("/api/", userRoute);
app.use("/api/ticket", ticketRoute);
// app.use("/api/auth/", authRoute);

// Welcome message
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
