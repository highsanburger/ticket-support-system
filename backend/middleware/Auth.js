// /middleware/Auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { TOKEN_KEY } = process.env;

// create json web token
const maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (id) => {
  return jwt.sign({ id }, TOKEN_KEY, {
    expiresIn: maxAge,
  });
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, TOKEN_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  const msg = err.message;

  // Signup

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "Email is already registered.";
  }
  if (msg.includes("Email Invalid")) {
    errors.email = "Invalid email format. Please enter a valid email address.";
  }
  if (msg.includes("Password Weak")) {
    errors.password =
      "Password must be at least 8 characters long and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.";
  }

  // Login

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "Email is not registered.";
  }
  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "Password is incorrect, L0L.";
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(val);
      console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
module.exports = {
  createToken,
  requireAuth,
  handleErrors,
  maxAge,
};
