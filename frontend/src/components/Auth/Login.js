// Login.js
import React, { useState } from "react";
import axios from "axios";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

const Login = ({ loginUrl }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    // Send a POST request using Axios
    try {
      const response = await axios.post(`${loginUrl}/login`, {
        email: formData.email,
        password: formData.password,
      });

      // Log the entire response data to the console
      console.log(response.data);

      // Assuming a successful response has a status of 2xx
      if (response.status >= 200 && response.status < 300) {
        // Successful login
        alert("Login successful!");
        navigate("/user");

        // Store user ID and token in cookies
        document.cookie = `id=${response.data.user}; max-age=${response.data.token.expiresIn}`;
        document.cookie = `token=${response.data.token}; max-age=${response.data.token.expiresIn}`;
        document.cookie = `email=${response.data.email}; max-age=${response.data.token.expiresIn}`;
      } else {
        // Handle errors
        alert(`Error: ${response.data.errors}`);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error during login:", error.message);
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
