import React, { useContext,useState } from 'react'
import { UserContext } from '../App';
import Product from './Product';
import { items } from '../ProductData';
import { Link } from 'react-router-dom';
import Loader from './Loader';
function Cart() {
  const [loading, setloading] = useState(false)
  const {cart,setcart} =useContext(UserContext); 
  const handleRemove=async (e)=>{
    setloading(true);
    try{
      const token=localStorage.getItem('token');
      const response=await fetch('https://jlt-xi.vercel.app/api/orders/remove',{
        method:'DELETE',
        body:JSON.stringify({productId:e.target.value}),
        headers:{
          'Content-Type': 'application/json',
          'authorization':`Bearer ${token}`,
        },
      })
      const carts=await response.json();
      setcart(carts);
    }
    catch(err){
      alert("Unable to remove your product from the cart") 
    }finally{
      setloading(false);
    }
  }
  const handleClearCart=async ()=>{
    setcart([]);
    try{
      const token=localStorage.getItem('token');
      const response=await fetch('https://jlt-xi.vercel.app/api/orders/totalremove',{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'authorization':`Bearer ${token}`,
        },
      }
      )
    }
    catch(err){
     alert("Unable to clear your Cart at the moment")
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
    <Link to={'/'}><button class="ani-button">Back to Home Page</button></Link>
    <div className="container my-5">
        <div className="row">
          {
          cart.map((product,i) => {            
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
                     <button className="btn btn-warning" onClick={handleRemove} value={product.id} disabled={loading}>{loading?<Loader/>:'Remove from Cart'}</button>
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