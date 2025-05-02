import axios from 'axios';
export const fetchProducts = () => async (dispatch) => {
    try {
        const response = await axios.get('https://ecombackend-aih3.onrender.com/api/products/',
             {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);
        const data =await response.data;
        console.log(data);
        dispatch({
            type: 'SET_PRODUCTS',
            payload: data,
        });
    }
    catch (error) {
        alert(error.response?.data?.message || 'Something went wrong');
    }
}