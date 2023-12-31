import { Route, Routes } from "react-router-dom";

import AdminDashboard from "./components/Admin/AdminDashboard";
import TicketView from "./components/Admin/AdminTicketView";
import UserLandingPage from "./components/User/UserLandingPage";
import CreateTicketForm from "./components/User/CreateTicketForm";
import UserDashboard from "./components/User/UserDashboard";
import UserTicketView from "./components/User/UserTicketView";

import Login from "./components/Auth/Login"; // Import the LoginForm component
import Logout from "./components/Auth/Logout";
import Signup from "./components/Auth/Signup"; // Import the LoginForm component
import ProtectUser from "./components/Auth/ProtectUser";
import ProtectAdmin from "./components/Auth/ProtectAdmin";

function App() {
  return (
    <Routes>
      {/* Public routes accessible to all */}
      <Route
        path="/signup"
        element={<Signup signUpUrl={"https://ticket-support-system-q1k0.onrender.com/api"} />}
      />

      <Route
        path="/login"
        element={<Login loginUrl={"https://ticket-support-system-q1k0.onrender.com/api"} />}
      />
      <Route
        path="/logout"
        element={<Logout logoutUrl={"https://ticket-support-system-q1k0.onrender.com/api"} />}
      />
      {/* Admin routes */}
      <Route element={<ProtectAdmin />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/ticket/:id" element={<TicketView />} />
      </Route>

      {/* User routes */}

      <Route element={<ProtectUser />}>
        <Route path="/user/*" element={<UserLandingPage />} />
        <Route path="/user/create" element={<CreateTicketForm />} />
        <Route path="/user/dashboard/*" element={<UserDashboard />} />
        <Route path="/user/ticket/:id" element={<UserTicketView />} />
      </Route>
    </Routes>
  );
}

export default App;
