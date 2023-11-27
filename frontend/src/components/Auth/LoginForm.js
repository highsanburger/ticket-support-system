import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { useNavigate, Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await dispatch(loginUser(email, password));

      // If login is successful, check the user's email and navigate accordingly
      if (response.data.user.email === "admin@tss.com") {
        // Navigate to /admin/dashboard for admin
        // Wait for some time (e.g., 2000 milliseconds or 2 seconds)
        toast.success("Admin Login successful!");
        setTimeout(() => {
          // Navigate after waiting
          navigate("/admin/dashboard");
        }, 2000);
      } else {
        toast.success("Login successful!");
        // Navigate to /user for regular users
        setTimeout(() => {
          // Navigate after waiting
          navigate("/user");
        }, 2000);
      }
    } catch (error) {
      // window.prompt("error")
      // Handle login error
      console.log(error.response.data.error);
      if (error.response.status === 401) {
        console.log("t");
        toast.error(error.response.data.error);
      } else {
        console.error("Login Error:", error);
        toast.error("An error occurred during login");
      }
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>.
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
