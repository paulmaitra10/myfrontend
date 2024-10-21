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
const UserContext = createContext();
function App() {
  const [data, setdata] = useState([]);
  const token=localStorage.getItem('token');
  const fetchCart=async ()=>{
   if(token){ try{

      const response=await fetch('http://localhost:5000/api/orders/cart',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
           'authorization': `Bearer ${token}`,
        },
      })
      const items=await response.json();
      console.log(items);
      setcart(items);
    }
    catch(err){
      console.log(err);
    }}
  }
  const fetchData=async ()=>{
      try {
        console.log('gg');
        
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
        console.log(data);
        
      } catch (err) {
        setError(err.message);
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
  console.log(data);
  return (
    <>
    <UserContext.Provider value={{cart,setcart,loggedin,setloggedin}}>
     <Router>
      <Navbar setdata={setdata}/>
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
