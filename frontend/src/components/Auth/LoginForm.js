import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(loginUser(email, password));
      // If login is successful, navigate to the /user route
      navigate("/user");
    } catch (error) {
      // Handle login error
      if (error.response && error.response.status === 401) {
        // Unauthorized (Invalid credentials)
        toast.error("Invalid credentials");
        // Stay on /login
      } else {
        console.error("Login Error:", error);
        toast.error("An error occurred during login");
        // Stay on /login
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
