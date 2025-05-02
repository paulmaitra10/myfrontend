import React, { useContext, useEffect, useState } from "react";
import { Star, Truck, Shield, Heart } from "lucide-react";
import { useParams } from "react-router-dom";
import { userContext } from "../App";
import { toast,ToastContainer} from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";

function ProductDetail() {
  const [laoding, setlaoding] = useState(false);
  const [data, setdata] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const token=localStorage.getItem('tok');
  const {cart,setcart}=useContext(userContext);
  const getProductDetail = async () => {
    try {
      setlaoding(true);
      const response = await fetch("https://ecombackend-aih3.onrender.com//api/products/");
      const items = await response.json();
      setdata(items);
      const filteredProducts = items.filter((i) => i.id === parseInt(id))
      setProduct(filteredProducts[0]);
      setlaoding(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProductDetail();
  }, [])
  const dispatch=useDispatch();
  const AddtoCart = async (e) => {
    if (token) {
      try {
        setlaoding(true);
        dispatch(addToCart(e.target.value));
        toast("Item is added to cart", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setlaoding(false);
      } catch (err) {
        alert(err);
      }
    } else {
      navigate("/login");
    }
  };
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
    theme="light"/>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
          <div className="animate-slide-in-left">
            <div className="relative group">
              <img
                src={product.imgSrc}
                alt={product.title}
                className="w-full h-[500px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="animate-slide-in-right">
       
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.title}
                </h1>
                <div className="flex items-center space-x-2">
                </div>
              </div>

              <p className="text-4xl font-bold text-gray-900">
                ${product.price}
              </p>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <div className="">
                <a
                  href={product.amazonLink}
                  className="text-blue-700 leading-relaxed"
                >
                  Checkout the product at Amazon
                </a>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Truck className="w-5 h-5" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span>2 year extended warranty</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  className="flex-1 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={AddtoCart}
                  value={product.id}
                  disabled={laoding}
                >
                  Add to Cart
                </button>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ProductDetail;
