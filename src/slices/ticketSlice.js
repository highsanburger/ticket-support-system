import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  ticket: null,
  editTicket: false,

}

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setTicket: (state, action) => {
      state.ticket = action.payload
    },
    setEditTicket: (state, action) => {
      state.editticket = action.payload
    },
  
    resetTicketState: (state) => {
      state.step = 1
      state.ticket = null
      state.editTicket = false
    },
  },
})

export const {
  setStep,
  setTicket,
  setEditTicket,
  
  resetTicketState,
} = ticketSlice.actions

export default ticketSlice.reducer