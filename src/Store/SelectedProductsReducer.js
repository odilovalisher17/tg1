import { createSlice } from "@reduxjs/toolkit";

export const selectedProductsSlice = createSlice({
  name: "selected-products",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      const obj = action.payload;
      const existingProduct = state.find(
        (product) => product.details.id === obj.id
      );
      if (existingProduct) {
        existingProduct.num = 1;
      } else {
        state.push({ details: obj, num: 1 });
      }
    },
    incrementProduct: (state, action) => {
      const obj = action.payload;
      const existingProduct = state.find(
        (product) => product.details.id === obj.id
      );
      if (existingProduct) {
        existingProduct.num += 1;
      }
    },
    decrementProduct: (state, action) => {
      const obj = action.payload;
      // const existingProduct = state.find((product) => product.id === id);
      // console.log(existingProduct);
      // if (existingProduct && existingProduct.num > 0) {
      //   existingProduct.num -= 1;
      // }
      state
        .map((e) => {
          if (e.details.id === obj.id) {
            e.num -= 1;
          }
          return e;
        })
        .filter((product) => product.num > 0);
    },
  },
});

export const { addProduct, incrementProduct, decrementProduct } =
  selectedProductsSlice.actions;

export default selectedProductsSlice.reducer;
