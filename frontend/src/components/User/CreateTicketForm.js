// components/User/CreateTicketForm.js
import React, { useState } from "react";
import axios from "axios";

const CreateTicketForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch user details based on a placeholder email
      const user = await axios.get("http://localhost:4000/api/auth/user", {
        params: { email: "user@example.com" },
      });

      if (!user.data) {
        console.error("User not found");
        return;
      }

      // Create a new ticket
      await axios.post("http://localhost:4000/api/ticket", {
        title,
        description,
        status: "Open",
        createdBy: user.data.email,
        assignedTo,
      });

      // Redirect the user to the landing page after creating the ticket
      // (replace '/user' with the appropriate route)
      window.location.href = "/user";
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div>
      <h2>Create New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Assigned To:
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateTicketForm;
