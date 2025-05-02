import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./redux/reducer/cartReducer";
import productReducer from "./redux/reducer/productReducer";
import loaderReducer from "./redux/reducer/loaderReducer";
import snackbarReducer from "./redux/reducer/snackbarReducer";
const store=configureStore({
    reducer:{
        cart: cartReducer,
        product:productReducer,
        loader:loaderReducer,
        snackbar:snackbarReducer,
    }
})

export default store;