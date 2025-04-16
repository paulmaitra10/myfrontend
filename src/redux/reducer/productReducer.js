import { createSlice } from '@reduxjs/toolkit';
// const user=JSON.parse(localStorage.getItem('tok'));
// const cart = user?.cart;
const initialState = {
    // cartItems: cart || [],
    // totalPrice: 0,
    // totalQuantity: 0,
    products:[],
}
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase("SET_PRODUCTS",(state, action) => {
                // state.cartItems.push(action.payload);
                // const tok=JSON.parse(localStorage.getItem("tok"));
                // const cart=tok?.cart || [];
                // cart.push(action.payload);
                // localStorage.setItem("tok",JSON.stringify({...tok,cart}));
                state.products=action.payload;
            }
        )
    }
}
);
 
export default productSlice.reducer;
