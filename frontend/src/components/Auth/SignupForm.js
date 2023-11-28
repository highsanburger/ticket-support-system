// components/Auth/SignupForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const isValidEmail = EMAIL_REGEX.test(email);
    const isValidPassword = PWD_REGEX.test(password);

    if (!isValidEmail) {
      toast.error("Invalid email.");
    } else if (!isValidPassword) {
      toast.error("Password must meet the specified criteria.");
    } else {
      try {
        const response = await fetch(
          "http://localhost:4000/api/user/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          },
        );

        const data = await response.json();

        if (response.ok) {
          toast.success("Registration successful!");
          setTimeout(() => {
            // Navigate after waiting
            navigate("/user");
          }, 2000);

          // Log the user ID and token to the console
          console.log("User ID:", data.user);
          console.log("Token:", data.token);

          // Optionally, handle successful registration, e.g., redirect the user
        } else {
          toast.error(data.error || "An error occurred during registration");
        }
      } catch (error) {
        console.error("Registration Error:", error);
        toast.error("An error occurred during registration");
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
