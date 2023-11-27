// store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer"; // Update the path if necessary

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers...
});

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
