import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserTicketView = () => {
  const [ticket, setTicket] = useState(null);
  const { ticketId } = useParams();

  useEffect(() => {
    console.log("Effect Triggered");

    if (!ticketId) {
      return; // Don't proceed if ticketId is undefined
    }

    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/ticket/${ticketId}`,
        );
        const { data } = response;
        setTicket(data);
      } catch (error) {
        console.error("Error fetching ticket details:", error.response);
      }
    };

    fetchTicketDetails();

    // Cleanup function to run when the component is unmounted
    return () => {
      setTicket(null); // Clear the state to prevent updating unmounted component
    };
  }, [ticketId]);

  if (!ticket) {
    return <div>Loading...</div>;
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
    </div>
  );
};

export default UserTicketView;
