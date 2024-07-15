import React, { useContext } from "react";
import { Link, useInRouterContext } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../App.jsx";
import Cart from "./Cart.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product=({items})=> {
const notify = () => toast("Item added to cart");
  const [cart,setcart]=useContext(UserContext);
  const AddtoCart=(e)=>{
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
    // console.log(e.target.value);
    console.log(items);
    e.target
    const element = items.filter((i)=>i.id==e.target.value)
    console.log(element);
    setcart([...cart,{element}])
    console.log(cart);
  }
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
