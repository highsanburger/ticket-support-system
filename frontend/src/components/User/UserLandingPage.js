import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import CreateTicketForm from "./CreateTicketForm";
import UserDashboard from "./UserDashboard";

const UserLandingPage = () => {
  // Use useSelector to access user information from the Redux store
  // const user = useSelector((state) => state.auth.user);
  // const userEmail = user ? user.email : null; // Extract email if the user object exists

  return (
    <div>
      <h2>User Landing Page</h2>
      {/* Display the user email */}
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
      <p>
        {" "}
        <Link to="/logout"> Logout.</Link>{" "}
      </p>
    </div>
  );
};

export default UserLandingPage;
