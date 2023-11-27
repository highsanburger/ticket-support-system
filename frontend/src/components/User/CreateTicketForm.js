import React, { useState } from "react";
import axios from "axios";
import "./CreateTicketForm.css"; // Import CSS file
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import the useSelector hook

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTicketForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notification, setNotification] = useState(null);

  // const user = useSelector((state) => state.auth.user);
  // const userEmail = user ? user.email : null; // Extract email if the user object exists

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCreateTicket = async () => {
    try {
      // const createdBy = "imsyedkhalid@gmail.com";
      const userEmail = localStorage.getItem("userEmail");
      const createdBy = userEmail ? userEmail : "email";
      const status = "Open";

      const response = await axios.post(
        "http://localhost:4000/api/ticket/create",
        {
          title,
          description,
          status,
          createdBy,
        },
      );

      // Set notification state to success message
      // setNotification({
      //   type: "success",
      //   message: "Ticket created successfully!",
      // });
      toast.success("Ticket created successfully!");

      // Wait for some time (e.g., 2000 milliseconds or 2 seconds)
      setTimeout(() => {
        // Navigate after waiting
        navigate("/user");
      }, 2500);
      // You might want to redirect the user or perform additional actions

      // Clear the form after successful submission
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating ticket:", error);
      // Set notification state to error message
      setNotification({
        type: "error",
        message: "Error creating ticket. Please try again.",
      });
    }
  };

  // Function to close the notification
  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="create-ticket-container2">
      <div className="create-ticket-container">
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
        {/* Apply CSS class to the main container */}
        <h2>Create Ticket</h2>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <br />
        <button onClick={handleCreateTicket}>Create Ticket</button>

        {/* Display notification if it exists */}
        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
            <button onClick={closeNotification}>&times;</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTicketForm;
