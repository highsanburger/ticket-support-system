// App.js
// import React from "react";
import { Route, Routes } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PrivateRoute from "./components/common/PrivateRoute";
// import AdminDashboard from "./components/Admin/AdminDashboard";
// import TicketView from "./components/Admin/TicketView";
import UserLandingPage from "./components/User/UserLandingPage";
import CreateTicketForm from "./components/User/CreateTicketForm";
import UserDashboard from "./components/User/UserDashboard";
import UserTicketView from "./components/User/UserTicketView";

import { Login, Signup } from "./pages";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/user/*" element={<UserLandingPage />} />
      <Route path="/user/create" element={<CreateTicketForm />} />
      <Route path="/user/dashboard/*" element={<UserDashboard />} />
      <Route path="/user/ticket/:id" element={<UserTicketView />} />
    </Routes>
  );
}
// <Route path="/admin/dashboard" element={<AdminDashboard />} />
// <Route path="/admin/ticket/:id" element={<TicketView />} />
//

export default App;
