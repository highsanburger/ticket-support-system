const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const fileUpload = require("express-fileupload");
// const createRoutes = require("./routes/createRoutes");
// const { cloudnairyconnect } = require("./config/cloudinary");
dotenv.config();

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL, {
//   // DEPLOY
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
//
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  }),
);
// app.use(
//   cors({
//     origin: JSON.parse(process.env.CORS_ORIGIN),
//     credentials: true,
//     maxAge: 14400,
//   }),
// );
// app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  }),
);
// cloudnairyconnect();

// Import models
const Ticket = require("./models/Tickets");
const User = require("./models/Users");

// Routes
const userRoutes = require("./routes/User");
const ticketRoutes = require("./routes/Ticket");
// const profileRoutes = require("./routes/Profile");
// const contactRoutes = require("./routes/ContactUs");

// Use routers
app.use("/api/auth", userRoutes);
app.use("/api/ticket", ticketRoutes);
// app.use("/api/tickets", createRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/contact", contactRoutes);

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
