// components/User/UserLandingPage.js
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import CreateTicketForm from "./CreateTicketForm";
import UserDashboard from "./UserDashboard";

const UserLandingPage = () => {
  return (
    <div>
      <h2>User Landing Page</h2>
      <ul>
        <li>
          <Link to="/user/create">Create Ticket</Link>
        </li>
        <li>
          <Link to="/user/dashboard">My Tickets</Link>
        </li>
      </ul>

      {/* Use Routes to handle navigation */}
      <Routes>
        <Route path="/user/create" element={<CreateTicketForm />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Routes>
    </div>
  );
};

export default UserLandingPage;
