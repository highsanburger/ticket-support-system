import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <TicketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TicketProvider>
    </AuthProvider>
  </React.StrictMode>,
);
