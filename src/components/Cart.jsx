import React, { useContext,createContext, useEffect } from 'react'
import { UserContext } from '../App';
import Product from './Product';
import { items } from '../ProductData';
import { Link } from 'react-router-dom';

function Cart() {
  const [cart,setcart] =useContext(UserContext);
  const handleRemove=(e)=>{
    const element=cart.filter((i)=>i.element[0].id!=e.target.value)
    setcart(element);
  }
  const handleClearCart=()=>{
    setcart([]);
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
            console.log(product.element[0].imgSrc);
            return (
                <div key={i} className="col-lg-4 my-3 text-center">
                  <div className="card" style={{ width: "18rem" }}>
                    <Link to={`/product.element[0]/${product.element[0].id}`} style={{display:'flex',justifyContent:'center',alignItems:'center'}}><img src={product.element[0].imgSrc} className="card-img-top" alt="..." /></Link>
                    <div className="card-body">
                      <h5 className="card-title">{product.element[0].title}</h5>
                      <p className="card-text">
                        {product.element[0].description}
                      </p>
                     <button className="btn btn-primary mx-3">{product.element[0].price} ₹</button>
                     <button className="btn btn-warning" onClick={handleRemove} value={product.element[0].id}>Remove from Cart</button>
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