import React, { useState } from "react";
import axios from "axios";

const Signup = ({ signUpUrl }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Send a POST request using Axios
    try {
      const response = await axios.post(`${signUpUrl}/signup`, {
        email: formData.email,
        password: formData.password,
      });

      // Assuming a successful response has a status of 2xx
      if (response.status >= 200 && response.status < 300) {
        // Successful signup
        alert("Signup successful!");

        // Store user ID and token in cookies
        document.cookie = `userId=${response.data.user}; max-age=${response.data.token.expiresIn}`;
        document.cookie = `token=${response.data.token}; max-age=${response.data.token.expiresIn}`;
      } else {
        // Handle errors
        alert(`Error: ${response.data.errors}`);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error during signup:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
