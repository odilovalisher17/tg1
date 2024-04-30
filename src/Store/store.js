import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./ProductReducer";
import StatusOfSearchReducer from "./StatusOfSearchReducer";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    stausofsearch: StatusOfSearchReducer,
  },
});
