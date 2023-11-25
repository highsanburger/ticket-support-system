/*
 The user's inputs are obtained from the req.body in the code above, and you then check the email to make sure no past registrations have been made. We'll use the values obtained from req.body to create the new user after that has occurred.

You don't need to worry about how the unique _id was obtained because MongoDB always assigns a new user with a unique _id

The newly formed user's _id is then supplied as an parameter to the createSecretToken() function, which handles token generation.

The cookie will be sent to the client with key of "token", and value of token.
 */
const User = require("../models/Users");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password, username, createdAt } = req.body;
    if (!email) {
      return res.json({ message: "Missing email field." });
    }
    if (!password) {
      return res.json({ message: "Missing password field." });
    }
    if (!username) {
      return res.json({ message: "Missing username field." });
    }
    // if (!accountType) {
    //   return res.json({ message: "Missing accountType field." });
    // }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.json({ message: "All fields are missing." });
    }
    if (!email) {
      return res.json({ message: "Missing email field." });
    }
    if (!password) {
      return res.json({ message: "Missing password field." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User does not exist." });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password." });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};
