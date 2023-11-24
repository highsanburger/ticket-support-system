// components/User/UserLandingPage.js
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import CreateTicketForm from "./CreateTicketForm";

const UserLandingPage = () => {
  return (
    <div>
      <h2>User Landing Page</h2>
      <ul>
        <li>
          <Link to="/user/create-ticket">Create Ticket</Link>
        </li>
        <li>
          <Link to="/user/my-tickets">My Tickets</Link>
        </li>
      </ul>

      {/* Use Routes to handle navigation */}
      <Routes>
        <Route path="/user/create-ticket" element={<CreateTicketForm />} />
      </Routes>
    </div>
  );
};

export default UserLandingPage;
