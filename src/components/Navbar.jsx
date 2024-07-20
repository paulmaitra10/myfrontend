import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Product from "./Product";
import { items } from "../ProductData";
import { UserContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
// console.log(items);

function Navbar({ setdata }) {
  const {loginWithRedirect,isAuthenticated,logout}=useAuth0();
  console.log(useLocation());
  const location=useLocation();
  const [cart, setcart] = useContext(UserContext);
  const handleNoFilter = () => {
    setdata(items);
  };
  const filterByCategory = (category) => {
    const element = items.filter((i) => i.category == category);
    setdata(element);
  };
  const filterByPrice = (price) => {
    const element = items.filter((i) => i.price > price || i.price == price);
    setdata(element);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    const element = items.filter(
      (i) =>
        i.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        i.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setdata(element);
  };
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
          
          {isAuthenticated?(
            <button className="btn btn-primary" onClick={logout({returnTo : window.location.origin})}>Log Out</button>
          ):
          (<button className="btn btn-primary" onClick={loginWithRedirect()}>Log In</button>)}
        
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
