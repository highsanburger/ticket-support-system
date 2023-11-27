// components/Admin/TicketView.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminTicketView = () => {
  const [ticket, setTicket] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newAssignedTo, setNewAssignedTo] = useState("");
  const { id } = useParams(); // Use useParams hook to get parameters from the URL

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/ticket/${id}`,
        );
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [id]); // Include id in the dependency array

  const handleStatusChange = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/ticket/${id}`,
        {
          status: newStatus,
        },
      );
      setTicket(response.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAssignedToChange = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/ticket/${id}`,
        {
          assignedTo: newAssignedTo,
        },
      );
      setTicket(response.data);
    } catch (error) {
      console.error("Error updating assignedTo:", error);
    }
  };

  if (!ticket) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Ticket View</h2>
      <p>Title: {ticket.title}</p>
      <p>Description: {ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <p>Created By: {ticket.createdBy}</p>
      <p>Assigned To: {ticket.assignedTo}</p>
      <p>Date Created: {new Date(ticket.dateCreated).toLocaleString()}</p>

      {/* Update Status */}
      <label>
        Update Status:
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
        <button onClick={handleStatusChange}>Update Status</button>
      </label>

      {/* Update Assigned To */}
      <label>
        Update Assigned To:
        <input
          type="text"
          value={newAssignedTo}
          onChange={(e) => setNewAssignedTo(e.target.value)}
        />
        <button onClick={handleAssignedToChange}>Update Assigned To</button>
      </label>
    </div>
  );
};

export default AdminTicketView;
