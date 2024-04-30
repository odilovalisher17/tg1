import { createSlice } from "@reduxjs/toolkit";

export const statusOfSearchReducer = createSlice({
  name: "statusOfSearch",
  initialState: "",
  reducers: {
    updateStatusOfSearch: (state, action) => {
      return action.payload.status;
    },
  },
});

export const { updateStatusOfSearch } = statusOfSearchReducer.actions;
export default statusOfSearchReducer.reducer;
