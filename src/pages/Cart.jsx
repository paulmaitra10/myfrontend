import React, { useContext, useEffect,useState } from "react";
import { motion } from "framer-motion";
import { userContext } from "../App.jsx";
import { Link } from "react-router-dom";
import { h1 } from "framer-motion/client";
import Loader from "../components/Loader.jsx";
import { toast, ToastContainer } from "react-toastify";
export function Cart() {
  const [loading, setloading] = useState(false);
  const { cart, setcart } = useContext(userContext);
  console.log(cart);
  
  const handleRemove = async (e) => {
    setloading(true);
    try {
      const token = localStorage.getItem("tok");
      const response = await fetch("https://jlt-xi.vercel.app/api/orders/remove", {
        method: "DELETE",
        body: JSON.stringify({ productId: e.target.value }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const carts = await response.json();
      console.log(carts);
      setcart(carts);
      toast('Item is removed from Cart', {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
              console.log('removed');
              setloading(false);
    } catch (err) {
      alert("Unable to remove your product from the cart");
    } finally {
      setloading(false);
    }
  };
  const handleClearCart = async () => {
    setcart([]);
    try {
      const token = localStorage.getItem("tok");
      const response = await fetch(
        "https://jlt-xi.vercel.app/api/orders/totalremove",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      setloading(false);
    } catch (err) {
      alert("Unable to clear your Cart at the moment");
    }
  }
  if (cart.length == 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center mt-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h1>
          <Link to={'/products'} className="px-6 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"/>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Products</h1>
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cart.map((product) => {
            
            return (
              <div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={product.imgSrc}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {
                        <motion.button
                          value={product.id}
                          onClick={handleRemove}
                          disabled={loading}
                          whileTap={{ scale: 0.95 }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Remove
                        </motion.button>
                      }
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
        <div className="flex justify-center mt-8">
          <motion.button
            onClick={handleClearCart}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 text-white px-5  py-3 rounded-md hover:bg-yellow-400"
          >
            Clear Cart
          </motion.button>
        </div>
      </div>
    </div>
    </>
  );
}
