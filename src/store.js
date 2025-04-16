import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./redux/reducer/cartReducer";
import productReducer from "./redux/reducer/productReducer";
import loaderReducer from "./redux/reducer/loaderReducer";
const store=configureStore({
    reducer:{
        cart: cartReducer,
        product:productReducer,
        loader:loaderReducer,
    }
})

export default store;