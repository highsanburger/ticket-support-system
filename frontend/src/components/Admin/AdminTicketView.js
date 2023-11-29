// components/Admin/TicketView.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminTicketView = () => {
  const [ticket, setTicket] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const { id } = useParams(); // Use useParams hook to get parameters from the URL

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `https://ticket-support-system-q1k0.onrender.com/api/ticket/${id}`,
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
        `https://ticket-support-system-q1k0.onrender.com/api/ticket/${id}`,
        {
          status: newStatus,
        },
      );
      setTicket(response.data);
      toast.success("Ticket Status updated!");
    } catch (error) {
      toast.error("Ticket did not change.");
      console.error("Error updating status:", error);
    }
  };

  if (!ticket) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2>Ticket View</h2>
      <p>Title: {ticket.title}</p>
      <p>Description: {ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <p>Created By: {ticket.createdBy}</p>
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
    </div>
  );
};

export default AdminTicketView;
