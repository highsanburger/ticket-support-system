// Import necessary libraries
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Import the CSS file


const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tickets when the component mounts
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/ticket");
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
  
 

  return (
    <div>
      <h2>Admin Dashboard</h2>
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
