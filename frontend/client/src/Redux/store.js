import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import brandReducer from "./slices/brandSlice";
import categoryReducer from "./slices/categorySlice";
import flavourReducer from "./slices/flavourSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    brands: brandReducer,
    categories: categoryReducer,
    flavours: flavourReducer,
    auth: authReducer,
  },
});