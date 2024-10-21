import React, { useContext,createContext, useEffect } from 'react'
import { UserContext } from '../App';
import Product from './Product';
import { items } from '../ProductData';
import { Link } from 'react-router-dom';

function Cart() {
  const {cart,setcart} =useContext(UserContext);
  console.log(cart);
  
  const handleRemove=async (e)=>{
    // const element=cart.filter((i)=>i.element[0].id!=e.target.value)
    // setcart(element);
    console.log(e.target.value);
    
    try{
      const token=localStorage.getItem('token');
      const response=await fetch('http://localhost:5000/api/orders/remove',{
        method:'DELETE',
        body:JSON.stringify({productId:e.target.value}),
        headers:{
          'Content-Type': 'application/json',
          'authorization':`Bearer ${token}`,
        },
      })
      const carts=await response.json();
      console.log(carts);
      // const element=cart.filter((i)=>{
      //   i.id!=carts.id
      // });
      setcart(carts);
    }
    catch(err){
      console.log(err);   
    }
  }
  const handleClearCart=async ()=>{
    // setcart([]);
    try{
      const token=localStorage.getItem('token');
      const response=await fetch('http://localhost:5000/api/orders/totalremove',{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'authorization':`Bearer ${token}`,
        },
      }
      )
      setcart([]);
    }
    catch(err){
      console.log(err);
      
    }
  }
  if (cart.length==0) {
    return(
      <>
      <div className="text-center">
        <h1>Your Cart is Empty</h1>
        <Link className='btn btn-warning' to='/'>Continue Shopping</Link>
      </div>
      </>
    )
  }
  return (
    <>
    Your Cart...
    <div className="container my-5">
        <div className="row">
          {
          cart.map((product,i) => {
            // console.log(product[0].imgSrc);
            // console.log(product.imgSrc);
            
            return (
                <div key={i} className="col-lg-4 my-3 text-center">
                  <div className="card" style={{ width: "18rem" }}>
                    <Link to={`/product[0]/${product.id}`} style={{display:'flex',justifyContent:'center',alignItems:'center'}}><img src={product.imgSrc} className="card-img-top" alt="..." /></Link>
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">
                        {product.description}
                      </p>
                     <button className="btn btn-primary mx-3">{product.price} ₹</button>
                     <button className="btn btn-warning" onClick={handleRemove} value={product.id}>Remove from Cart</button>
                    </div>
                  </div>
                </div>
          
            )
          })}
        </div>
        <div className="container text-center my-5">
          <button className='btn btn-danger' onClick={handleClearCart}>Clear Cart</button>
        </div>
      </div>
    </>
  )
}

export default Cart