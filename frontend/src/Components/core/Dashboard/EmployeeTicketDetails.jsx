// EmployeeTicketDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styling/employeeticketdetails.css"; // Import your CSS file

const EmployeeTicketDetails = () => {
  const { ticketId } = useParams();
  const [ticketDetails, setTicketDetails] = useState(null);
  const [feedbackContent, setFeedbackContent] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const api = axios.create({
          baseURL: "http://localhost:5000",
        });

        const response = await api.get(`/api/tickets/${ticketId}/details`);
        const fetchedTicketDetails = response.data;

        // Check if there are feedbacks, update status accordingly
        if (fetchedTicketDetails.feedbacks.length > 0) {
          fetchedTicketDetails.currentstatus = "in progress";

          // Update ticket status in the backend
          api
            .patch(`/api/tickets/${ticketId}/update-status`, {
              newStatus: "in progress",
            })
            .then((response) => {
              // Log or handle the response from the backend if needed
              console.log("Ticket status updated successfully:", response.data);
            })
            .catch((error) => {
              console.error("Error updating ticket status", error);
            });
        }

        setTicketDetails(fetchedTicketDetails);
      } catch (error) {
        console.error("Error fetching ticket details", error);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);
  // Inside handleAddFeedback
  const handleAddFeedback = () => {
    const api = axios.create({
      baseURL: "http://localhost:5000",
    });

    api
      .post(`/api/tickets/${ticketId}/add-feedback`, {
        content: feedbackContent,
      })
      .then((response) => {
        setTicketDetails(response.data);
        setFeedbackContent(""); // Clear the note content after submission

        // Check the current status before updating to "in progress"
        if (
          response.data.feedbacks.length > 0 &&
          (response.data.currentstatus === "in progress" ||
            response.data.currentstatus === "open")
        ) {
          // Update ticket status to "in progress" in frontend state
          setTicketDetails((prevTicketDetails) => ({
            ...prevTicketDetails,
            currentstatus: "in progress",
          }));
          // Update ticket status to "in progress" in the backend
          api
            .patch(`/api/tickets/${ticketId}/update-status`, {
              newStatus: "in progress",
            })
            .then((response) => {
              // Log or handle the response from the backend if needed
              console.log("Ticket status updated successfully:", response.data);
            })
            .catch((error) => {
              console.error("Error updating ticket status", error);
            });
        } else {
        }
      })
      .catch((error) => {
        console.error("Error adding feedback to ticket", error);
      });
  };

  // Inside handleCloseTicket
  const handleCloseTicket = () => {
    const api = axios.create({
      baseURL: "http://localhost:5000",
    });

    // Check the current status before updating to "closed"
    if (ticketDetails.currentstatus !== "closed") {
      api
        .patch(`/api/tickets/${ticketId}/update-status`, {
          newStatus: "closed",
        })
        .then((response) => {
          // Update ticket status to "closed" in frontend state
          setTicketDetails((prevTicketDetails) => ({
            ...prevTicketDetails,
            currentstatus: "closed",
          }));

          // Log or handle the response from the backend if needed
          console.log("Ticket closed successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error closing ticket", error);
        });
    }
  };

  const handleGoBack = () => {
    // Navigate back to the view tickets page
    navigate(`/employeepage/${ticketDetails.assignedTo}/view-tickets`);
  };
  if (!ticketDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ticket-details-container">
      <button onClick={handleGoBack} className="go-back-button">
        Go Back
      </button>
      <h2 className="ticket-details-heading">Ticket Details</h2>
      <div className="ticket-info">
        <p className="ticket-info-item">
          <span className="info-label">Ticket Id:</span> {ticketDetails._id}
        </p>
        <p className="ticket-info-item">
          <span className="info-label">Description:</span>{" "}
          {ticketDetails.description}
        </p>
        <p className="ticket-info-item">
          <span className="info-label">Status:</span>
          {ticketDetails.currentstatus}
        </p>
        <p className="ticket-info-item">
          <span className="info-label">Created At:</span>{" "}
          {new Date(ticketDetails.createdAt).toLocaleString()}
        </p>
        <p className="ticket-info-item">
          <span className="info-label">Customer Name:</span>{" "}
          {ticketDetails.customerName}
        </p>
        <p className="ticket-info-item">
          <span className="info-label">Customer Email:</span>{" "}
          {ticketDetails.customerEmail}
        </p>
      </div>
      <div className="notes-container">
        <p className="notes-heading">Notes:</p>
        <ul>
          {ticketDetails.notes.map((note, index) => (
            <li key={index} className="note-item">
              {note.content}
            </li>
          ))}
        </ul>
      </div>
      {ticketDetails.feedbacks && ticketDetails.feedbacks.length > 0 && (
        <div className="feedbacks-container">
          <h3 className="fonts">Response</h3>
          <ul>
            {ticketDetails.feedbacks.map((feedback) => (
              <li key={feedback._id}>
                {feedback.content} -{" "}
                {new Date(feedback.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}


      <div className="add-feedback-container">
        <textarea
          value={feedbackContent}
          onChange={(e) => setFeedbackContent(e.target.value)}
          placeholder="Add a response..."
        />
        <br></br>
        <button onClick={handleAddFeedback} className="add-feedback-button">
          Add Response
        </button>
      </div>
      <button onClick={handleCloseTicket} className="close-ticket-button">
        Close Ticket
      </button>
    </div>
  );
};

export default EmployeeTicketDetails;
