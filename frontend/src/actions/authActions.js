// authActions.js

import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:4000/api/user/login", {
      email,
      password,
    });
    dispatch({
      type: "LOGIN_USER",
      payload: response.data, // Return the entire response
    });

    return response; // Return the entire response
  } catch (error) {
    // Handle login error
    console.error("Login Error:", error);
    throw error; // Re-throw the error for the component to handle
  }
};

export const registerUser = (email, password, username) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/user/register",
      {
        email,
        password,
        username,
      },
    );
    dispatch({
      type: "REGISTER_USER",
      payload: response.data, // Return the entire response
    });

    return response; // Return the entire response
  } catch (error) {
    // Handle registration error
    console.error("Registration Error:", error);
    throw error; // Re-throw the error for the component to handle
  }
};
