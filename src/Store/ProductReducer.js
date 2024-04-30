import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    updateProducts: (state, action) => {
      return action.payload.products;
    },
  },
});

export const { updateProducts } = productSlice.actions;

export default productSlice.reducer;
