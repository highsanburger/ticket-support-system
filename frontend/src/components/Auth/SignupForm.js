// components/Auth/SignupForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../actions/authActions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const dispatch = useDispatch();

  // Local component state to manage form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email and password validation regex
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);

    if (!v1) {
      toast.error("Invalid email.");
    } else if (!v2) {
      toast.error(
        "Password must contain at least one lowercase letter, uppercase letter, digit, special character from the set !@#$% & be between 8 and 24 characters.",
      );
    } else {
      try {
        // Dispatch the registerUser action with form data
        const response = await dispatch(registerUser(email, password));

        // Check response and show appropriate messages
        if (response && response.payload && response.payload.user) {
          toast.success("Registration successful!");
          // Optionally, you can redirect the user after successful registration
          // history.push('/login');
        } else if (response && response.payload && response.payload.error) {
          toast.error(response.payload.error);
        } else {
          toast.error("An error occurred during registration");
        }
      } catch (error) {
        console.log(error.response.data.error);
        console.log(error.response.status);
        if (error.response.status === 501) {
          console.log("t");
          toast.error(error.response.data.error);
        } else {
          console.error("Login Error:", error);
          toast.error("An error occurred during signup");
        }
      }
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupForm;
