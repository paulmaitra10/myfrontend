import { nav } from "framer-motion/client";

export const signupUser = (userData, navigate) => async (dispatch) => {
  try {
    console.log(userData); 
    dispatch({ type: "SET_LOADER", payload: true });
    const response = await fetch("https://ecombackend-aih3.onrender.com/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      dispatch({ type: "SET_LOADER", payload: false });
      throw new Error(data.message || "Something went wrong");
    }

    dispatch({
      type: "SET_SNACKBAR_MESSAGE",
      payload: {
        message: "Email Sent",
        endColor: "#acffa5",
        startColor: "#effeed",
      },
    });

    if (navigate) {
      dispatch({ type: "SET_LOADER", payload: false });
      navigate("/checkEmail", { state: userData });
    }
    dispatch({ type: "SET_LOADER", payload: false });
    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: "SET_SNACKBAR_MESSAGE",
      payload: {
        message: error.message,
        endColor: "#f17d73",
        startColor: "#ffe2e0",
      },
    });
    dispatch({ type: "SET_LOADER", payload: false });
    return Promise.reject(error); // Ensure error is caught in component
  }
};

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "SET_LOADER", payload: true });
        const response = await fetch('https://ecombackend-aih3.onrender.com/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            dispatch({ type: "SET_LOADER", payload: false });
            console.log(response);
            const errorData = await response.json(); // assuming error message is sent as JSON
            throw new Error(errorData.message || 'Something went wrong');

            // setloading(false)
            // throw new Error('Invalid Email or Password');
        }
        const data = await response.json();
        console.log(data);
        localStorage.setItem("cuuxx",JSON.stringify(data.cart));
        localStorage.setItem("tok", JSON.stringify(data));
        dispatch({
            type: "SET_SNACKBAR_MESSAGE",
            payload: {
              message: 'Welcome Back',
              endColor: "#acffa5",
              startColor: "#effeed",
            },
          });
        window.location.href = "/";
        dispatch({ type: "SET_LOADER", payload: false });
    } catch (error) {
        console.error('Error fetching user:', error.response?.data?.message || error.message);
        // show user-friendly message
        dispatch({
            type: "SET_SNACKBAR_MESSAGE",
            payload: {
              message:error.message,
              endColor: "#f17d73",
              startColor: "#ffe2e0",
            },
          });      }
}

 export const confirmEmail = (token,navigate) =>async (dispatch) => {
    try {
    console.log(token);
      const response = await fetch(`https://ecombackend-aih3.onrender.com/api/users/confirm-email?token=${token}`, {
        method: 'POST', // Sending a GET request to the backend
        headers: {
          'Content-Type': 'application/json', // If needed (for JSON APIs)
        },
      });
  
      // Handle success or failure based on response
      if (!response.ok) {
        const errorData = await response.json(); // assuming error message is sent as JSON
        throw new Error(errorData.message || 'Something went wrong');
    }
    const data = await response.json()
    // then(setloading(false));
    // const token=await data.token;
    console.log(data);
    localStorage.setItem("tok", JSON.stringify(data));
    localStorage.setItem("cuuxx",JSON.stringify(data.cart));
    dispatch({
        type: "SET_SNACKBAR_MESSAGE",
        payload: {
          message: 'Welcome To TechHub',
          endColor: "#acffa5",
          startColor: "#effeed",
        },
      });
      if (navigate) {
        // dispatch({ type: "SET_LOADER", payload: false });
        navigate("/");
      }
    } catch (error) {
      console.log('Error:', error);
      dispatch({
        type: "SET_SNACKBAR_MESSAGE",
        payload: {
          message:error.message,
          endColor: "#f17d73",
          startColor: "#ffe2e0",
        },
      });      }
  };
  