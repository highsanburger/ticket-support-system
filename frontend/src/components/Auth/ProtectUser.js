import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  // Check for the presence of the token in the cookie or local storage
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  // Replace this with your actual token validation logic
  const isValidToken = validateToken(token);

  return isValidToken;
};

const validateToken = (token) => {
  if (!token) {
    return false;
  }

  try {
    // Decode the token (Note: This doesn't verify the signature)
    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    // Check the token's expiration (timestamp is in seconds)
    const isTokenExpired = decodedToken.exp < Date.now() / 1000;

    // Add additional checks if needed
    // e.g., Check if the token contains required claims, etc.

    return !isTokenExpired;
  } catch (error) {
    console.error("Error decoding or validating token:", error);
    return false;
  }
};
const ProtectUser = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectUser;
