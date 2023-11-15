// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt"); // Import bcrypt
const jwt = require("jsonwebtoken"); // Import JWT library

// Route for user registration (sign-up)
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, userType, specialization } =
    req.body;

  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Create a new user document with hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType,
      specialization: userType === "employee" ? specialization : "",
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Route for user sign-in
router.post("/signin", async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email, userType });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // If email and password are correct, generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m", // Token expires in 10 min (you can adjust this as needed)
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Error signing in" });
  }
});

module.exports = router;
