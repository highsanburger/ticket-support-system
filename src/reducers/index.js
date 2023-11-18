import { combineReducers } from "redux";
import authReducer from '../slices/authSlice'

import profieReducer from "../slices/profileSlice";
import loadingBarReducer from "../slices/loadingBarSlice"


const rootReducer=combineReducers({
    auth:authReducer,
   
    profile:profieReducer,
    loadingBar: loadingBarReducer,
    // ticket:ticketReducer,
    // viewTicket:viewTicketReducer,
    
})
export default rootReducer;

