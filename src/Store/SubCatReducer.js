import { createSlice } from "@reduxjs/toolkit";

export const SubCutSlice = createSlice({
  name: "SubCat",
  initialState: "",
  reducers: {
    updateSubCat: (state, action) => {
      return action.payload.status;
    },
  },
});

export const { updateSubCat } = SubCutSlice.actions;
export default SubCutSlice.reducer;
