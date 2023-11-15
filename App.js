// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserDash from "./components/UserDash";
import CreateTicket from "./components/CreateTicket";
import ViewMyTickets from "./components/ViewMyTickets";
import TicketDetails from "./components/TicketDetails";
import AdminDash from "./components/AdminDash";
import ViewEmployeeTickets from "./components/ViewEmployeeTickets";
import EmployeeTicketDetails from "./components/EmployeeTicketDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userpage/:userId" element={<UserDash />} />
        <Route path="/employeepage/:userId" element={<AdminDash />} />
        <Route
          path="/userpage/:userId/create-ticket"
          element={<CreateTicket />}
        />
        <Route
          path="/userpage/:userId/view-tickets"
          element={<ViewMyTickets />}
        />
        <Route
          path="/userpage/:userId/view-tickets/:ticketId/details"
          element={<TicketDetails />}
        />
        <Route
          path="/employeepage/:userId/view-tickets"
          element={<ViewEmployeeTickets />}
        />
        <Route
          path="/employeepage/:userId/view-tickets/:ticketId/details"
          element={<EmployeeTicketDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
