import React, { useState, useContext } from "react";
import axios from "axios";
// import { AuthContext } from "../../context/AuthContext"; // Correct the path if needed
import "./CreateTicketForm.css"; // Import CSS file

const CreateTicketForm = () => {
  // const { user } = useContext(AuthContext); // Change 'auth' to 'user' since 'user' is the property in the context

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCreateTicket = async () => {
    try {
      // const createdBy = user ? user.email : null; // Change 'auth.user' to 'user'

      const response = await axios.post(
        "http://localhost:4000/api/ticket/create",
        {
          title,
          description,
          createdBy,
        },
      );

      // Provide visual confirmation here if needed
      console.log("Ticket created successfully!");
      console.log("Created Ticket:", response.data);

      // You might want to redirect the user or perform additional actions
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div className="create-ticket-container2">
      <div className="create-ticket-container">
        {" "}
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
      </div>
    </div>
  );
};

export default CreateTicketForm;
