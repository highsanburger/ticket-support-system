// frontend/src/components/Auth/Signup.js
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ signUpUrl }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Your signup API call using axios here
      // Example:
      const response = await axios.post(signUpUrl, { email, password });

      // Handle successful signup
      // Example: Set user data in state, update context, etc.
      // ...

      // Redirect to user landing page after successful signup
      return <Navigate to="/user" />;
    } catch (error) {
      // Handle signup error
      setError("Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign up</button>
      </form>

      {/* Display an error message if signup fails */}
      {error && <p>{error}</p>}

      {/* Link to the login page if already a user */}
      <p>
        Already a user? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Signup;
