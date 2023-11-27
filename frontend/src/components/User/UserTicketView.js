import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserTicketView = () => {
  const [ticket, setTicket] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/ticket/${id}`,
        );
        const ticketData = response.data;
        setTicket(ticketData);
        setNewStatus(ticketData.status);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [id]);

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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/ticket/${id}`);
      setIsDeleted(true);
      // Optionally, you can handle other actions after deletion.
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  if (isDeleted) {
    // Redirect to another page after deletion
    window.location.href = "/user"; // Change "/tickets" to the desired path
    return null; // You can also render a loading message here if needed
  }

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

      {/* Delete Button */}
      {isDeleteConfirmed ? (
        <div>
          <p>Are you sure you want to delete this ticket?</p>
          <button onClick={handleDelete}>Confirm Delete</button>
          <button onClick={() => setIsDeleteConfirmed(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsDeleteConfirmed(true)}>
          Delete Ticket
        </button>
      )}
    </div>
  );
};

export default UserTicketView;
