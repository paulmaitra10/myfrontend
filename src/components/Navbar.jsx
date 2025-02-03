import React, { useState } from "react";
import { Link,NavLink } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, User, FastForward } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { button } from "framer-motion/client";

const Navbar = ({ cart }) => {
  const handleLogout = () => {
    localStorage.removeItem("tok");
    window.location.reload();
  }
  const [showLogoutButton, setshowLogoutButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [token,settoken]=useState(localStorage.getItem("tok"));
  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">TechHub</h1>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black font-bold text-lg"
                    : "text-gray-600 hover:text-gray-900" 
                }`
              }>
              Home
            </NavLink>
            <NavLink to="/products" className={({ isActive }) =>
                ` ${
                  isActive
                    ? "text-black font-bold text-lg"
                    : "text-gray-600 hover:text-gray-900" 
                }`
              }>
              Products
            </NavLink>
            {/* <Link to="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link> */}
            <div className="flex items-center space-x-4">
              {/* <Search className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" /> */}
              {token ? (
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <User className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
                </Link>
              )}
              <div className="relative">
                <Link to="/cart">
                  <ShoppingCart className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
                </Link>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                `block px-3 py-2${
                  isActive
                    ? "text-black font-bold text-lg"
                    : "text-gray-600 hover:text-gray-900" 
                }`
              }
              >
                Home
              </NavLink>
               <NavLink
                to="/products"
                className={({ isActive }) =>
                  ` block px-3 py-2      ${
                    isActive
                      ? "text-black font-bold text-lg"
                      : "text-gray-600 hover:text-gray-900" 
                  }`
                }
              >
                Products
              </NavLink>
              {/* <Link to="/categories" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Categories</Link> */}
              <div className="flex items-center space-x-4 px-3 py-2">
                {/* <Search className="w-6 h-6 text-gray-600" /> */}
                {token ? (
                  <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <Link to="/login">
                    <User className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
                  </Link>
                )}
                <div className="relative">
                  <Link to={"/cart"}>
                    <ShoppingCart className="w-6 h-6 text-gray-600" />
                  </Link>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
