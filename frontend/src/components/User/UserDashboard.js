// components/User/UserDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import UserTicketView from "./UserTicketView";

import { useSelector } from "react-redux"; // Import the useSelector hook

const UserDashboard = () => {
  const [userTickets, setUserTickets] = useState([]);
  const navigate = useNavigate();

  // const user = useSelector((state) => state.auth.user);
  // const userEmail = user ? user.email : null; // Extract email if the user object exists

  const userEmail = localStorage.getItem("userEmail");
  console.log(userEmail);
  // Hardcoded createdBy value
  const createdBy = userEmail ? userEmail : "email";

  useEffect(() => {
    // Fetch tickets created by the specified user
    const fetchUserTickets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/ticket/user/${createdBy}`,
        );
        setUserTickets(response.data);
      } catch (error) {
        console.error("Error fetching user tickets:", error);
      }
    };

    fetchUserTickets();
  }, [createdBy]);

  const handleViewTicket = (ticketId) => {
    // Redirect to the individual ticket view
    navigate(`/user/ticket/${ticketId}`);
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Showing tickets created by: {createdBy}</p>
      {userTickets.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {userTickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.title}</td>
                <td>{ticket.description}</td>
                <td>{ticket.status}</td>
                <td>
                  <button onClick={() => handleViewTicket(ticket._id)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Routes>
        <Route path="/user/ticket/:ticketId" element={<UserTicketView />} />
      </Routes>
    </div>
  );
};

export default UserDashboard;
