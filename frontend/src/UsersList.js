import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the /users endpoint
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>
              {user.firstName} {user.lastName}
            </strong>{" "}
            - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
