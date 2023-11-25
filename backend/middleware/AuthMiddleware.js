// checks if the user has access to the route by checking if the tokens match
const User = require("../models/Users");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  // AuthMiddleware.js
  // AuthMiddleware.js
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        req.user = user; // Attach user information to the request
        return res.json({ status: true, user: user.username });
      } else {
        return res.json({ status: false });
      }
    }
  });
};
