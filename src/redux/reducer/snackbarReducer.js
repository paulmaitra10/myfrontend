import { createSlice } from '@reduxjs/toolkit';
// const user=JSON.parse(localStorage.getItem('tok'));
// const cart = user?.cart;
const initialState = {
    // cartItems: cart || [],
    // totalPrice: 0,
    // totalQuantity: 0,
    snackbarMessage: "",
    endColor: "",
    startColor: "",
}
const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase("SET_SNACKBAR_MESSAGE", (state, action) => {
            state.snackbarMessage = action.payload.message;
            state.endColor = action.payload.endColor;
            state.startColor = action.payload.startColor;
          })
    }
}
);

export default snackbarSlice.reducer;
