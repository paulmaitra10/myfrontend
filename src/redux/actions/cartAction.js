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
    const updatedCart = await res.json();
    console.log(updatedCart);
    dispatch({
      type: "ADD_TO_CART",
      payload: updatedCart,
    });
    // dispatch({
    //   type: "SET_LOADER",
    //   payload: false,
    // })
  } catch (error) {
    console.error("Add to cart failed", error);
  }
};

// REMOVE ITEM
export const removeFromCart = (productId) => async (dispatch) => {
  try {
    // dispatch({
    //   type: "SET_LOADER",
    //   payload: true,
    // })
    const tokenData = JSON.parse(localStorage.getItem("tok"));
    const token = tokenData?.token;
    const res = await fetch("https://ecombackend-aih3.onrender.com/api/orders/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId:productId }),
    });
    const updatedCart = await res.json();
    console.log(updatedCart);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: updatedCart,
    });
    // dispatch({
    //   type: "SET_LOADER",
    //   payload: false,
    // })
  } catch (error) {
    console.error("Remove from cart failed", error);
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
    const items=await clearedCart.items;
    console.log(clearedCart.items);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: items,
    });
    // dispatch({
    //   type: "SET_LOADER",
    //   payload: false,
    // })
    // dispatch(clearLocalCart()); // Assuming backend returns empty array
  } catch (error) {
    console.error("Clear cart failed", error);
  }
};
