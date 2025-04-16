import axios from 'axios';
export const fetchProducts = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/products/',
             {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);
        const data =response.data;
        console.log(data);
        dispatch({
            type: 'SET_PRODUCTS',
            payload: data,
        });
    }
    catch (error) {
        console.log(error)
    }
}