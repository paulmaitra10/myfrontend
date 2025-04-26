import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { userContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartAction';
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("tok");
  const { cart, setcart } = useContext(userContext);
  const AddtoCart = async (e) => {
    const user = JSON.parse(localStorage.getItem("tok"));
    const token = user?.token;
    if (token) {
      try {
        setloading(true);
        dispatch(addToCart(e.target.value));
        toast('Item is added to cart', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // console.log('added');
        setloading(false);
      }
      catch (err) {
        console.log(err)
      }
    }
    else {
      navigate("/login");
    }
  }
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.imgSrc}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
        </Link>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          {<motion.button
            value={product.id}
            disabled={loading}
            onClick={AddtoCart}   
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </motion.button>}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;