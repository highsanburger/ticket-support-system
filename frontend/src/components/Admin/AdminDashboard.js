// frontend/src/components/Admin/AdminDashboard.js
// Import necessary libraries
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Import the CSS file
import { Link, Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All"); // Default: show all tickets
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tickets when the component mounts
    fetchTickets();
  }, [selectedStatus]); // Fetch tickets whenever the selectedStatus changes

  const fetchTickets = async () => {
    try {
      // Define the URL based on the selected status
      const url =
        selectedStatus === "All"
          ? "http://localhost:4000/api/ticket"
          : `http://localhost:4000/api/ticket?status=${selectedStatus}`;

      const response = await axios.get(url);
      console.log("Response:", response.data); // Log the entire response
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleViewTicket = (ticketId) => {
    // Redirect to the TicketView component with the specific ticket's ID
    navigate(`/admin/ticket/${ticketId}`);
  };

  const handleStatusChange = (e) => {
    // Update the selected status when the dropdown value changes
    setSelectedStatus(e.target.value);
  };

  return (
    <div>
      <p>
        {" "}
        <Link to="/logout"> Logout.</Link>{" "}
      </p>
      <h2>Admin Dashboard</h2>
      <label htmlFor="status">Filter by Status:</label>
      <select id="status" onChange={handleStatusChange} value={selectedStatus}>
        <option value="All">All</option>
        <option value="Open">Open</option>
        <option value="Pending">Pending</option>
        <option value="Resolved">Resolved</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Assigned To</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
              <td>{ticket.createdBy}</td>
              <td>{ticket.assignedTo}</td>
              <td>{new Date(ticket.dateCreated).toLocaleString()}</td>
              <td>
                <button onClick={() => handleViewTicket(ticket._id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
