import { addCart, clearLocalCart, setCart } from "../reducer/cartReducer";

// ADD ITEM
export const addToCart = (productId) => async (dispatch) => {
  try {
    // dispatch({
    //   type: "SET_LOADER",
    //   payload: true,
    // })
    const tokenData = JSON.parse(localStorage.getItem("tok"));
    const token = tokenData?.token;
    console.log(token);
    const res = await fetch("https://ecombackend-aih3.onrender.com/api/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });
    const updatedProduct = await res.json();
    console.log(updatedProduct);
    const items = JSON.parse(localStorage.getItem("cuuxx")) || []; // Get and parse stored items
    console.log(items);
    items.push(updatedProduct); // Push to array directly
    localStorage.setItem("cuuxx", JSON.stringify(items)); // Save back to localStorage
    dispatch({
      type: "ADD_TO_CART",
      payload: updatedProduct,
    });
    dispatch({
      type:"SET_SNACKBAR_MESSAGE",
      payload:{
        message:"Item Added to Cart",
        endColor: "#acffa5",
        startColor: "#effeed",
      }
    })
  } catch (error) {
    console.error('Error fetching user:', error.response?.data?.message || error.message);
    // show user-friendly message
    dispatch({
      type: "SET_SNACKBAR_MESSAGE",
      payload: {
        message: error.message || "Something went wrong",
        endColor: "#f17d73",
        startColor: "#ffe2e0",
      },
    });
  }
};

// REMOVE ITEM
export const removeFromCart = (productId) => async (dispatch) => {
  try {
    // dispatch({
    //   type: "SET_LOADER",
    //   payload: true,
    // })
    console.log(productId);
    const tokenData = await JSON.parse(localStorage.getItem("tok"));
    const token = await tokenData?.token;
    const res = await fetch("https://ecombackend-aih3.onrender.com/api/orders/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: productId }),
    });
    const updatedProduct = await res.json();
    console.log(updatedProduct);
    // const items=localStorage.getItem(JSON.parse("cuuxx"));
    localStorage.setItem("cuuxx", JSON.stringify(updatedProduct)); 
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: updatedProduct,
    });
    dispatch({
      type:"SET_SNACKBAR_MESSAGE",
      payload:{
        message:"Item Removed from Cart",
        endColor: "#acffa5",
        startColor: "#effeed",
      }
    })
  } catch (error) {
    console.error('Error fetching user:', error.response?.data?.message || error.message);

    // show user-friendly message
    dispatch({
      type: "SET_SNACKBAR_MESSAGE",
      payload: {
        message: error.message || "Something went wrong",
        endColor: "#f17d73",
        startColor: "#ffe2e0",
      },
    });
  }
};

// CLEAR CART
export const clearCart = () => async (dispatch) => {
  try {
    // dispatch({
    //   type: "SET_LOADER",
    //   payload: true,
    // })
    const tokenData = JSON.parse(localStorage.getItem("tok"));
    const token = tokenData?.token;

    const res = await fetch("https://ecombackend-aih3.onrender.com/api/orders/totalremove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const clearedCart = await res.json();
    const items = await clearedCart.items;
    // console.log(clearedCart.items);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: items,
    });
    dispatch({
      type:"SET_SNACKBAR_MESSAGE",
      payload:{
        message:"Cart Cleared",
        endColor: "#acffa5",
        startColor: "#effeed",
      }
    })
  } catch (error) {
    console.error('Error fetching user:', error.response?.data?.message || error.message);

    // show user-friendly message
    dispatch({
      type: "SET_SNACKBAR_MESSAGE",
      payload: {
        message: error.message || "Something went wrong",
        endColor: "#f17d73",
        startColor: "#ffe2e0",
      },
    });  }
};
