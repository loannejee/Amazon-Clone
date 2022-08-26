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
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload]
      console.log(state.items)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((cartItem) => {
        if (action.payload.id != cartItem.id) {
          return cartItem
        }
      })
    },

    // removeFromCart: (state, action) => {
    //   const index = state.items.findIndex(
    //     (cartItem) => (cartItem.id === action.payload.id) 
    //   );

    //   let newCart = [...state.items];

    //   if (index >= 0) {
    //     // The item exists in the basket... remove it...
    //     newCart.splice(index, 1);
    //   } else {
    //     console.warn("Can't remove product")
    //   }

    //   state.items = newCart
    // },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

// SELECTORS - This is how we pull information from the Global store slice
export const selectItems = (state) => state.cart.items; // Referring to line 5
export const selectTotal = (state) => state.cart.items.reduce(
  ( previousElement, currentElement) => previousElement + parseFloat(currentElement.price), 0
)

export default cartSlice.reducer;