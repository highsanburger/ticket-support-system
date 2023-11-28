import { Navigate, Outlet } from "react-router-dom";

// Accessing .env
// require("dotenv").config(); //getting Polyfill node core modules in webpack 5 error
// const { ADMIN_MAIL } = process.env;
const ADMIN_MAIL = "admin@tss.com";

const useAuth = () => {
  // Check for the presence of the token in the cookie or local storage
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1]; // DIRECTLY ACCESS??

  // Replace this with your actual token validation logic
  const isValidToken = validateToken(token);

  return isValidToken;
};
const validateToken = (token) => {
  if (!token) {
    return false;
  }

  try {
    const email = document.cookie
      .split("; ")
      .find((row) => row.startsWith("email="))
      ?.split("=")[1]; // DIRECTLY ACCESS??
    // Decode the token (Note: This doesn't verify the signature)
    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    // Check the token's expiration (timestamp is in seconds)
    const isTokenExpired = decodedToken.exp < Date.now() / 1000;

    // Check if the user has the "admin" role
    // const isAdmin = decodedToken.role === "admin";

    // Check if the user's email is "admin@TSS.com"
    const isSpecificUser = email === ADMIN_MAIL;
    // const isSpecificUser = true;

    // Add additional checks if needed
    // e.g., Check if the token contains required claims, etc.

    return !isTokenExpired && isSpecificUser;
  } catch (error) {
    console.error("Error decoding or validating token:", error);
    return false;
  }
};

const ProtectAdmin = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectAdmin;
