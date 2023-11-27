import React, { useEffect } from "react";

import { setCreatedBy } from "./reducers/authReducer";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AdminDashboard from "./components/Admin/AdminDashboard";
import TicketView from "./components/Admin/AdminTicketView";
import UserLandingPage from "./components/User/UserLandingPage";
import CreateTicketForm from "./components/User/CreateTicketForm";
import UserDashboard from "./components/User/UserDashboard";
import UserTicketView from "./components/User/UserTicketView";
import LoginForm from "./components/Auth/LoginForm"; // Import the LoginForm component
import SignupForm from "./components/Auth/SignupForm"; // Import the LoginForm component

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  // Check localStorage for user email on app initialization
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      // Dispatch an action to set the user email in the Redux store
      dispatch(setCreatedBy(userEmail));
    }
  }, [dispatch]);
  return (
    <Routes>
      {/* If the user is authenticated, redirect to the appropriate dashboard */}
      {!isAuthenticated && (
        <Route path="/" element={<Navigate to="/login" />} />
      )}
      {/* Public routes accessible to all */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />

      {/* Admin routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/ticket/:id" element={<TicketView />} />

      {/* User routes */}
      <Route path="/user/*" element={<UserLandingPage />} />
      <Route path="/user/create" element={<CreateTicketForm />} />
      <Route path="/user/dashboard/*" element={<UserDashboard />} />
      <Route path="/user/ticket/:id" element={<UserTicketView />} />
    </Routes>
  );
}

export default App;
