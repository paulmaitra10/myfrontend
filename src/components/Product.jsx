import React, { useContext,useEffect } from "react";
import { Link, useInRouterContext } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../App.jsx";
import Cart from "./Cart.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faL } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader.jsx";

const Product=({items})=> {
  const [loading, setloading] = useState(false);
  const token=localStorage.getItem('token')
  const notify = () => toast("Item added to cart");
  const {cart,setcart}=useContext(UserContext);
  const AddtoCart=async (e)=>{
    setloading(true);
 if(token)
    { 
      try{
      const response=await fetch('https://jlt-xi.vercel.app/api/orders/',{
        method:'POST',
        body:JSON.stringify({productId:e.target.value}),
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}` // Add JWT token to the Authorization header
        },
      })
      const result=await response.json().then(setloading(false));
      setcart([...cart,result]);
      toast('Item is added to cart', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    catch(err){
     alert(err)
    }}
    else{
      alert('You need to login first')
    }
  }
  const fetchData=async ()=>{
      try {
        setloading(true)
        const response = await fetch('https://jlt-xi.vercel.app/api/products/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
  
        const data = await response.json();
        setdata(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setloading(false);
      }  
    // useEffect to call the fetchProducts function when the component mounts
  
  }
  useEffect(() => {
    fetchData;
  }, []);
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"/>
      <div className="container my-5">
        <div className="row">
          {items.map((product,i) => {
            return (
                <div key={i} className="col-lg-4 my-3 text-center">
                  <div className="card" style={{ width: "18rem" }}>
                    <Link to={`/product/${product.id}`} style={{display:'flex',justifyContent:'center',alignItems:'center'}}><img src={product.imgSrc} className="card-img-top" alt="..." /></Link>
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">
                        {product.description}
                      </p>
                     <button className="btn btn-primary mx-3">{product.price} ₹</button>
                     <button className="btn btn-warning" value={product.id} onClick={AddtoCart} disabled={loading} >{loading?<Loader/>:'Add to Cart'}</button>
                    </div>
                  </div>
                </div>
          
            )
          })}
        </div>
      </div>
    </>
  );
}

export default Product;
