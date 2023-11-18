import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styling/ticketdetails.css";

const TicketDetails = () => {
  const [ticketDetails, setTicketDetails] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();
  const { ticketId } = useParams();

  useEffect(() => {
    const api = axios.create({
      baseURL: "http://localhost:5000",
    });

  
    api
      .get(`/api/tickets/${ticketId}/details`)
      .then((response) => {
        setTicketDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ticket details", error);
      });
  }, [ticketId]);
  const handleAddNote = () => {
    const api = axios.create({
      baseURL: "http://localhost:5000",
    });

    api
      .post(`/api/tickets/${ticketId}/add-note`, { content: noteContent })
      .then((response) => {
        setTicketDetails(response.data);
        setNoteContent(""); // Clear the note content after submission
      })
      .catch((error) => {
        console.error("Error adding note to ticket", error);
      });
  };
  if (!ticketDetails) {
    return <div>Loading...</div>;
  }
  const handleDeleteTicket = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (isConfirmed) {
      const api = axios.create({
        baseURL: "http://localhost:5000",
      });

      console.log("Deleting ticket with ID:", ticketId); // Log the ticketId
      api
        .delete(`/api/tickets/${ticketId}/delete`)
        .then(() => {
          // Redirect to the user's ticket list or another appropriate page
          const userId = ticketDetails.userId; // Assuming userId is part of ticketDetails
          navigate(`/userpage/${userId}/view-tickets`);
        })
        .catch((error) => {
          console.error("Error deleting ticket", error);
        });
    }
  };
  const handleGoBack = () => {
    // Navigate back to the view tickets page
    navigate(`/userpage/${ticketDetails.userId}/view-tickets`);
  };
  return (
    <div className="ticket-details-container">
      <button onClick={handleGoBack} className="go-back-button">
        Go Back
      </button>
      <h1 className="fonts">Ticket Details</h1>
      <p className="fonts">
        <b>Ticket Id: </b>
        {ticketDetails._id}
      </p>
      <p className="fonts">
        <b>Product Type: </b>
        {ticketDetails.productType}
      </p>
      <p className="fonts">
        <b>Status: </b>
        {ticketDetails.currentstatus}
      </p>
      <p className="fonts">
        <b>Created At: </b>
        {new Date(ticketDetails.createdAt).toLocaleString()}
      </p>
      <p className="fonts">
        <b>Description: </b>
        {ticketDetails.description}
      </p>
      <button onClick={handleDeleteTicket} className="delete-button">
        Delete Ticket
      </button>
      {ticketDetails.notes && ticketDetails.notes.length > 0 && (
        <div className="notes-container">
          <h3 className="fonts">Notes</h3>
          <ul>
            {ticketDetails.notes.map((note) => (
              <li key={note._id}>
                {note.content} - {new Date(note.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="add-note-container">
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Add a note..."
        />
        <br></br>
        <button onClick={handleAddNote} className="add-note-button">
          Add Note
        </button>
      </div>
      <div className="feedbacks-container">
        <p className="feedbacks-heading">Responses:</p>
        <ul>
          {ticketDetails.feedbacks.map((feedback, index) => (
            <li key={index} className="feedback-item">
              {feedback.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicketDetails;
