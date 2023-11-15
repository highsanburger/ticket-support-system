const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const createRoutes = require("./routes/createRoutes"); // Import your createRoutes
const employeeRoutes = require("./routes/employeeRoutes");
const dotenv = require("dotenv").config(); // Load environment variables from a .env file
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api/user", userRoutes);
app.use("/api/tickets", createRoutes); // Use createRoutes for handling ticket creation
app.use("/api/employee", employeeRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
