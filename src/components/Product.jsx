import React, { useContext,useEffect } from "react";
import { Link, useInRouterContext } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../App.jsx";
import Cart from "./Cart.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product=({items})=> {
  const token=localStorage.getItem('token')
  console.log(items);
  const notify = () => toast("Item added to cart");
  const {cart,setcart}=useContext(UserContext);
  const AddtoCart=async (e)=>{
    // console.log(e.target.value);
    // console.log(items);
    // e.target
    // const element = items.filter((i)=>i.id==e.target.value)
    // console.log(element);
    // setcart([...cart,{element}])
    // console.log(cart);
 if(token)
    {  try{
      const response=await fetch('http://localhost:5000/api/orders/',{
        method:'POST',
        body:JSON.stringify({productId:e.target.value}),
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}` // Add JWT token to the Authorization header
        },
      })
      // console.log(response);
      
      const result=await response.json();
      console.log(result);
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
      console.log(err); 
    }}
    else{
      alert('You need to login first')
    }
  }
  const fetchData=async ()=>{
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/', {
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
        console.log(items);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    // useEffect to call the fetchProducts function when the component mounts
  
  }
  useEffect(() => {
    fetchData;
  }, []);
  // console.log(items);
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
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
                     <button className="btn btn-warning" value={product.id} onClick={AddtoCart} >Add To Cart</button>
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
