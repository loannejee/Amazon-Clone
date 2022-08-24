import { createSlice } from "@reduxjs/toolkit";

//INITIAL STATE:
const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ACTIONS, STATE, PAYLOAD:
    addToCart: (state, action) => {},
    removeFromCart: (state, action) => {},
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

// SELECTORS - This is how we pull information from the Global store slice
// Similar to 'switch(action.type)'?
export const selectItems = (state) => state.cart.items; // Referring to line 5

export default cartSlice.reducer;