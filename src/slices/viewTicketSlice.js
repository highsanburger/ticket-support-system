import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  ticketSectionData: [],
  ticketEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
}

const viewTicketSlice = createSlice({
  name: "viewTicket",
  initialState,
  reducers: {
    setTicketSectionData: (state, action) => {
      state.ticketSectionData = action.payload
    },
    setEntireTicketData: (state, action) => {
      state.ticketEntireData = action.payload
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
    },
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload]
    },
  },
})

export const {
  setTicketSectionData,
  setEntireTicketData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewTicketSlice.actions

export default viewTicketSlice.reducer