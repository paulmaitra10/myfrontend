import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmEmail } from "../redux/actions/login_signup_Action";
import { CheckCircle } from "lucide-react";

export function ConfirmEmail() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(confirmEmail(token, navigate));
  };

  if (!token) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <h1 className="text-3xl font-semibold text-red-600">Something's Wrong</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Email Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Your email has been successfully verified. You can now continue shopping with us.
        </p>
        <button
          onClick={handleClick}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300"
        >
          Continue to Shop
        </button>
      </div>
    </div>
  );
}


  
