import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./ProductReducer";
import StatusOfSearchReducer from "./StatusOfSearchReducer";
import SelectedProductsReducer from "./SelectedProductsReducer";
import SubCutSliceReducer from "./SubCatReducer";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    statusofsearch: StatusOfSearchReducer,
    selectedProducts: SelectedProductsReducer,
    subCat: SubCutSliceReducer,
  },
});
