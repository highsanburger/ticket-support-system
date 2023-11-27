// authActions.js

import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";

// authActions.js

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:4000/api/user/login", {
      email,
      password,
    });

    // Store user information in localStorage
    localStorage.setItem("userEmail", response.data.user.email);

    dispatch({
      type: "LOGIN_USER",
      payload: { user: response.data.user, token: response.data.token },
    });
  } catch (error) {
    console.error("Login Error:", error);
  }
};

export const registerUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/user/register",
      {
        email,
        password,
      },
    );
    dispatch({
      type: REGISTER_USER,
      payload: { user: response.data.user, token: response.data.token },
    });
  } catch (error) {
    // Handle registration error
    console.error("Registration Error:", error);
  }
};
