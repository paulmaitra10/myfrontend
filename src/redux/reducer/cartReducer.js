import { createSlice } from '@reduxjs/toolkit';

const tokenData = JSON.parse(localStorage.getItem("tok"));
const initialCart = tokenData?.cart || [];

const initialState = {
  cartItems: initialCart,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase("ADD_TO_CART", (state, action) => {
        console.log(action.payload);
        state.cartItems=[...state.cartItems, action.payload];
        const tok = JSON.parse(localStorage.getItem("tok"));
        const cart = tok?.cart || [];
        cart.push(action.payload);
        localStorage.setItem("tok", JSON.stringify({ ...tok, cart }));
      }
      )
      .addCase("REMOVE_FROM_CART", (state, action) => {
        state.cartItems=action.payload;
        const tok = JSON.parse(localStorage.getItem("tok"));
        tok.cart=action.payload;
        localStorage.setItem("tok", JSON.stringify(tok));
      })
  }
});

export const { setCart, clearLocalCart, addCart } = cartSlice.actions;
export default cartSlice.reducer;
