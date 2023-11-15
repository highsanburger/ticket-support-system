import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [records, setRecords] = useState([]);

  // GET-ing all records
  useEffect(() => {
    console.log("Fetching data...");
    fetch("http://localhost:8080/ticket")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setRecords(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>
        <h2>Ticket Table</h2>
      </div>

      <div className="record">
        {records.map((record) => (
          <div className="blog-preview" key={record._id}>
            <h3>{record.title}</h3>
            <p>Description: {record.description}</p>
            <p>
              Created by: {record.createdBy} on {record.dateCreated}
            </p>
            <p>
              Assigned to: {record.assignedTo} with Status: {record.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
