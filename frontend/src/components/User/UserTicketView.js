// components/User/UserTicketView.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate, Link } from "react-router-dom";

const UserTicketView = () => {
  const [ticket, setTicket] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/ticket/${id}`,
        );
        setTicket(response.data);
        setEditedTitle(response.data.title);
        setEditedDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/ticket/${id}`,
        {
          title: editedTitle,
          description: editedDescription,
        },
      );
      setTicket(response.data);
      setIsEditing(false);
      toast.success("Ticket Updated!");
    } catch (error) {
      toast.error("Ticket did not update.");
      console.error("Error updating ticket:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/ticket/${id}`);
      toast.success("Ticket Deleted!");
      setTimeout(() => {
        // Navigate after waiting
        navigate("/user");
      }, 2000);
      // Optionally, you can handle other actions after deletion.
    } catch (error) {
      toast.error("Ticket did not get deleted.");
      console.error("Error deleting ticket:", error);
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
      {isEditing ? (
        <>
          <label>
            Title:
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </label>
          <label>
            Description:
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </label>
          <button onClick={handleUpdate}>Update Ticket</button>
        </>
      ) : (
        <>
          <p>Title: {ticket.title}</p>
          <p>Description: {ticket.description}</p>
          <p>Status: {ticket.status}</p>
          <p>Created By: {ticket.createdBy}</p>
          <p>Date Created: {new Date(ticket.dateCreated).toLocaleString()}</p>
          <button onClick={() => setIsEditing(true)}>Edit Details</button>
          {isDeleteConfirmed ? (
            <div>
              <p>Are you sure you want to delete this ticket?</p>
              <button onClick={handleDelete}>Confirm Delete</button>
              <button onClick={() => setIsDeleteConfirmed(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setIsDeleteConfirmed(true)}>
              Delete Ticket
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default UserTicketView;
