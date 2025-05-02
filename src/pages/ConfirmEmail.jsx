import { h1 } from "framer-motion/client";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { confirmEmail } from "../redux/actions/login_signup_Action";

export function ConfirmEmail() {
    const location=useLocation();
    const query = new URLSearchParams(location.search);
    const token = query.get("token"); 
    console.log(token);
    const dispatch=useDispatch();
    const navigate=useDispatch();
    const handleClick=()=>{
        dispatch(confirmEmail(token,navigate));
    }

    {if(token){return (
      <div className="flex flex-col items-center justify-center mt-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Email has been Confirmed</h1>
        <button
          className="px-6 py-2 bg-blue-600 text-white mt-4 font-medium text-sm rounded-lg shadow hover:bg-blue-700 cursor-pointer"
          onClick={handleClick}
        >
         Click here to Continue
        </button>
      </div>
    )}else return(<h1 className="text-4xl font-bold text-gray-800 mb-4">Something's Wrong </h1>)}
  }

  
