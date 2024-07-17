import React, { useContext } from "react";
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
const UserContext = createContext();
function App() {
  const [data, setdata] = useState([...items]);
  const [cart, setcart] = useState([]);
  const [disable, setdisable] = useState(false);
  console.log(data);
  return (
    <>
    <UserContext.Provider value={[cart,setcart]}>
     <Router>
      <Navbar setdata={setdata}/>
      <Routes>
        <Route path="/" element={<Product items={data}/>}/>
        <Route path="/product/:id" element={<PRoductDetails />} />
        <Route path="/search/:term" element={<SearchItems />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
     </Router>
     </UserContext.Provider>
    </>
  );
}

export default App;
export {UserContext};