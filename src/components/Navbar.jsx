import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Product from "./Product";
// import { items } from "../ProductData";
import { UserContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
function Navbar({ setdata }) {
  const navigate = useNavigate();
  const [products, setproducts] = useState();
  const { cart, setcart } = useContext(UserContext);
  const fetchdata = async () => {
    try {
      const response = await fetch("https://jlt-xi.vercel.app/api/products/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setproducts(data);
    } catch (err) {
      setError(err.message);
    }
    // useEffect to call the fetchProducts function when the component mounts
  };
  useEffect(() => {
    fetchdata();
    // fetchCart();
  }, []);

  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const handleNoFilter = () => {
    setdata(products);
  };
  const filterByCategory = (category) => {
    if (category == "no") {
      setdata(products);
      return;
    }
    const element = products.filter((i) => i.category == category);
    setdata(element);
  };
  const filterByPrice = (price) => {
    const element = products.filter(
      (i) => i.price > Number(price) || i.price == Number(price)
    );
    setdata(element);
  };
  const handleChange = (e) => {
    const element = products.filter(
      (i) =>
        i.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        i.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setdata(element);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const fetchData = async () => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://jlt-xi.vercel.app/api/products/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setdata(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // useEffect to call the fetchProducts function when the component mounts
  };
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
              style={{ borderRadius: "50px", padding: "7px", width: "15rem" }}
            />
            <select
              className="filter"
              name="Filter by Products"
              id=""
              onChange={(e) => {
                if (
                  e.target.value == 29000 ||
                  e.target.value == 49000 ||
                  e.target.value == 69000 ||
                  e.target.value == 89000
                ) {
                  filterByPrice(e.target.value);
                } else {
                  filterByCategory(e.target.value);
                }
              }}
            >
              <option value="no">No Filter</option>
              <option value="mobiles" className="item">
                Mobiles
              </option>
              <option value="laptops" className="item">
                Laptops
              </option>
              <option value="tablets" className="item">
                Tablets
              </option>
              <option value="29000" className="item">
                {">"}29000
              </option>
              <option value="49000" className="item">
                {">"}49000
              </option>
              <option value="69000" className="item">
                {">"}69000
              </option>
              <option value="89000" className="item">
                {">"}89000
              </option>
            </select>
          </div>
          {token ? (
            <button className="btn btn-primary" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          )}

          <Link to="/cart" className="cart">
            <button type="button" className="btn btn-primary position-relative">
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link>
          {/* {location.pathname == "/" && (
          <div className="navbarwrapper"> */}
        </div>
        {/* <span className="items">Filters</span>
            <button className="animated-button" onClick={() => handleNoFilter()}>
              No Filter
            </button>
            <button
              className="animated-button"
              onClick={() => filterByCategory("mobiles")}
            >
              Mobiles
            </button>
            <button
              className="animated-button"
              onClick={() => filterByCategory("laptops")}
            >
              Laptops
            </button>
            <button
              className="animated-button"
              onClick={() => filterByCategory("tablets")}
            >
              Tablets
            </button>
            <button className="animated-button" onClick={() => filterByPrice("29000")}>
              {">="}29000
            </button>
            <button className="animated-button" onClick={() => filterByPrice("49000")}>
              {">="}49000
            </button>
            <button className="animated-button" onClick={() => filterByPrice("69000")}>
              {">="}69000
            </button>
            <button className="animated-button" onClick={() => filterByPrice("89000")}>
              {">="}89000
            </button> */}

        {/* </div> */}
        {/* )} */}
      </header>
    </>
  );
}

export default Navbar;
