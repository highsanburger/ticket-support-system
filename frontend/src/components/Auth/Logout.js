import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Logout = ({ logoutUrl }) => {
  const handleLogout = async () => {
    try {
      // Make a request to the server to invalidate the token and clear the cookie
      await axios.post(`${logoutUrl}/logout`);
      // Cookies.set("email", null);
      // Cookies.set("token", null);
      // Cookies.set("id", null);
      Cookies.remove("email");
      Cookies.remove("token");
      Cookies.remove("id");
      // Redirect the user to the login page or any other desired page
      // You can use react-router-dom's useHistory hook for navigation
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
