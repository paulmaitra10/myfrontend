import React, { useContext,useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Product from "./Product";
// import { items } from "../ProductData";
import { UserContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
// console.log(items);

function Navbar({ setdata}) {  
  const navigate=useNavigate();
  const [products, setproducts] = useState();
  const {cart,setcart}=useContext(UserContext);
  // const [items, setitems] = useState(data);
  console.log(products);
  // const fetchCart=async ()=>{
  //   if(token){ try{
  //      const response=await fetch('http://localhost:5000/api/orders/cart',{
  //        method:'GET',
  //        headers:{
  //          'Content-Type':'application/json',
  //           'authorization': `Bearer ${token}`,
  //        },
  //      })
  //      const items=await response.json();
  //      console.log(items);
  //      setcart(items);
  //    }
  //    catch(err){
  //      console.log(err);
  //    }}
  //  }
  const fetchdata=async ()=>{
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
      setproducts(data);
      console.log(data);
      
    } catch (err) {
      setError(err.message);
    }
  // useEffect to call the fetchProducts function when the component mounts

}
useEffect(() => {
  fetchdata();
  // fetchCart();
}, []);

  const {loginWithRedirect,isAuthenticated,logout}=useAuth0();
  console.log(useLocation());
  const location=useLocation();
  const token=localStorage.getItem('token');
  const handleNoFilter = () => {
    setdata(products);
  };
  const filterByCategory = (category) => {
    const element = products.filter((i) => i.category == category);
    setdata(element);
  };
  const filterByPrice = (price) => {
    const element = products.filter((i) => i.price > price || i.price == price);
    setdata(element);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    const element = products.filter(
      (i) =>
        i.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        i.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setdata(element);
  };
  const handleLogout=()=>{
    localStorage.removeItem('token');
    window.location.href='/';
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
       setdata(data)
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
  return (
    <>
      <header className="sticky-top">
        <div className="navbar">
          <Link to={"/"} className="brand">
            E-Cart
          </Link>
          <div className="searchbar">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Search Products"
            />
          </div>
          
          {token?(
            <button className="btn btn-primary" onClick={handleLogout}>Log Out</button>
          ):
          (<button className="btn btn-primary" onClick={()=>navigate('/login')}>Log In</button>)}
        
          <Link to="/cart" className="cart">
            <button type="button" className="btn btn-primary position-relative">
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link>
          
        </div>
        {location.pathname == "/" && (
          <div className="navbarwrapper">
            <span className="items">Filter By{"->"}</span>
            <button className="items" onClick={() => handleNoFilter()}>
              No Filter
            </button>
            <button
              className="items"
              onClick={() => filterByCategory("mobiles")}
            >
              Mobiles
            </button>
            <button
              className="items"
              onClick={() => filterByCategory("laptops")}
            >
              Laptops
            </button>
            <button
              className="items"
              onClick={() => filterByCategory("tablets")}
            >
              Tablets
            </button>
            <button className="items" onClick={() => filterByPrice("29000")}>
              {">="}29000
            </button>
            <button className="items" onClick={() => filterByPrice("49000")}>
              {">="}49000
            </button>
            <button className="items" onClick={() => filterByPrice("69000")}>
              {">="}69000
            </button>
            <button className="items" onClick={() => filterByPrice("89000")}>
              {">="}89000
            </button>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
