// authReducer.js

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
    case "REGISTER_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export const setCreatedBy = (createdBy) => ({
  type: "SET_CREATED_BY",
  payload: { createdBy },
});

export default authReducer; // Add the default export here
