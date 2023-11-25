// components/User/UserDashboard.js
import React, { useState } from "react";
import axios from "axios";
import { Link, Routes, Route } from "react-router-dom";
import UserTicketView from "./UserTicketView";

const UserDashboard = () => {
  const [userName, setUserName] = useState("");
  const [userTickets, setUserTickets] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch tickets created by the specified user
      const response = await axios.get(
        `http://localhost:4000/api/ticket/user/${userName}`,
      );

      setUserTickets(response.data);
    } catch (error) {
      console.error("Error fetching user tickets:", error);
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Your Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
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
                  <Link to={`/user/ticket/${ticket._id}`}>
                    <button>View</button>
                  </Link>
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
