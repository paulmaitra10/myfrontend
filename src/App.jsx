import React from 'react';
import { createContext } from "react";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductCard from './components/ProductCard';
import { Products } from './pages/Products';
import { Signup } from './pages/Signup';
import { Login } from './pages/LogIn';
import { Cart } from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import { Footer } from './Footer';
import { Fleet } from './components/fleet';
const userContext = createContext();
function App() {
  const [loading, setloading] = useState(false);
  const [cart, setcart] = useState([]);
  const [data, setdata] = useState([]);
  const token=localStorage.getItem("tok");
  const fetchCart=async ()=>{
   if(token){ try{
    setloading(true)
      const response=await fetch('https://jlt-xi.vercel.app/api/orders/cart',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
           'authorization': `Bearer ${token}`,
        },
      })
      const items=await response.json();
      setcart(items);
    }
    catch(err){
      console.log(err);
    }
    finally{
      setloading(false);
    }
  }
  }
  const fetchData=async ()=>{
      try {
        setloading(true)
        const response = await fetch('https://jlt-xi.vercel.app/api/orders/cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
        })
        const items = await response.json();


        setcart(items);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setloading(false);
      }
    }
  useEffect(() => {
    // fetchData();
    fetchCart();
  }, []);
  return (
    <userContext.Provider value={{ cart: cart, setcart: setcart }}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar cart={cart}/>
          <div className="pt-16"> {/* Add padding top to account for fixed navbar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pro" element={<ProductCard product={data} />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/fleet' element={<Fleet />} />
            </Routes>
          </div>

        </div>
        <Footer />
      </Router>
    </userContext.Provider>
  );
}
export default App;
export {userContext}
