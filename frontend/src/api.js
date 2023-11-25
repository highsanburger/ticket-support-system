// apiService.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const createTicket = async (ticketData, authToken) => {
  try {
    const response = await axiosInstance.post(
      "/api/ticket/create",
      ticketData,
      {
        headers: {
          ...axiosInstance.defaults.headers,
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more functions for other API calls if needed

export default axiosInstance;
