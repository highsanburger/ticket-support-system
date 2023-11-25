// TicketContext.js
import { createContext, useContext, useState } from "react";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [createdBy, setCreatedBy] = useState(null);

  const setCreatedByUser = (userEmail) => {
    setCreatedBy(userEmail);
  };

  return (
    <TicketContext.Provider value={{ createdBy, setCreatedByUser }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicket must be used within a TicketProvider");
  }
  return context;
};
