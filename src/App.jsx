import React, { useContext,useEffect } from "react";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import { Outlet } from "react-router-dom";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import PRoductDetails from "./components/PRoductDetails";
import SearchItems from "./components/SearchItems";
import Cart from "./components/Cart";
import { items } from "./ProductData";
import { useState } from "react";
import {createContext } from "react";
import Login from "./components/Login";
import Signup from './components/Signup';
import Loader from "./components/Loader";
const UserContext = createContext();
function App() {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
  const token=localStorage.getItem('token');
  const fetchCart=async ()=>{
   setloading(true);
   if(token){ try{
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
        setloading(true);
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
      }
      finally{
        setloading(false);
      }
    // useEffect to call the fetchProducts function when the component mounts
  }
  useEffect(() => {
    fetchData();
    fetchCart();
  }, []);
  const [cart, setcart] = useState([]);
  
  const [disable, setdisable] = useState(false);
  const [loggedin, setloggedin] = useState(false);
  return (
    <>
    <UserContext.Provider value={{cart,setcart,loggedin,setloggedin}}>
     <Router>
      <Navbar setdata={setdata}/>
      {loading?<Loader/>:''};
      <Routes>
        <Route path="/" element={<Product items={data}/>}/>
        <Route path="/product/:id" element={<PRoductDetails />} />
        <Route path="/search/:term" element={<SearchItems />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
     </Router>
     </UserContext.Provider>
    </>
  );
}

export default App;
export {UserContext};
