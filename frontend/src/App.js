// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PrivateRoute from "./components/common/PrivateRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import TicketView from "./components/Admin/TicketView";
import UserLandingPage from "./components/User/UserLandingPage";
import CreateTicketForm from "./components/User/CreateTicketForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/*" element={<UserLandingPage />} />
        <Route path="/user/create-ticket" element={<CreateTicketForm />} />
        <Route
          path="/user/my-tickets"
          element={<p>My Tickets List Goes Here</p>}
        />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/ticket/:id" element={<TicketView />} />
      </Routes>
    </Router>
  );
}

export default App;
