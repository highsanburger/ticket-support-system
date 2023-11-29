// routes/User.js
const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { createToken, handleErrors, maxAge } = require("../middleware/Auth");

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({ user: user._id, email: email, token: token });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, email: email, token: token });
  } catch (err) {
    const errors = handleErrors(err);
    console.log(err);
    res.status(400).json({ errors });
  }
});

router.post("/logout", (req, res) => {
  // Clear the token from the client by setting an expired cookie
  res.clearCookie("jwt"); // Assuming your token is named "jwt"

  // You can also perform additional cleanup or actions related to logging out

  // Redirect the client to the home page or any desired page
  res.status(200).json({ message: "Logout successful" });
});
// router.post("/logout", (req, res) => {
//   // Clear the token from the client by setting an expired cookie
//   res.cookie("token", "", { expires: new Date(0) });
//
//   // You can also perform additional cleanup or actions related to logging out
//
//   // Send a response indicating successful logout
//   res.status(200).json({ message: "Logout successful" });
// });
module.exports = router;
