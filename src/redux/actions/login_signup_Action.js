export const signupUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: "SET_LOADER", payload: true });
        const response = await fetch("https://ecombackend-aih3.onrender.com/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            dispatch({ type: "SET_LOADER", payload: false });
            // setloading(false)
            const errorData = await response.json(); // assuming error message is sent as JSON
            throw new Error(errorData.message || 'Something went wrong');
        }
        const data = await response.json()
        // then(setloading(false));
        // const token=await data.token;
        console.log(data);
        localStorage.setItem("tok", JSON.stringify(data));
        window.location.href = "/"
        dispatch({ type: "SET_LOADER", payload: false });
    } catch (error) {
        // console.log("An error occurred. Please try again.");
        console.log(error.message);
        alert(error.message);
        
    }
}

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
        localStorage.setItem("tok", JSON.stringify(data));
        window.location.href = "/";
        dispatch({ type: "SET_LOADER", payload: false });
    } catch (err) {
        alert(err.message);
        // dispatch({ type: "SET_LOADER", payload: false });
        console.log(err.message);
        // setError(err.message);
    }
}