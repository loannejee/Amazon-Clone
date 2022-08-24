import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";

// THE GLOBAL STORE SETUP
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});