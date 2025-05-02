import React from 'react';
import { useDispatch } from 'react-redux';
import { confirmEmail, signupUser } from '../redux/actions/login_signup_Action';
import { useLocation } from 'react-router-dom';

const CheckEmail = () => {
  const dispatch=useDispatch();
  const location=useLocation();
  const userData=location.state||{}
  const handleClick=()=>{
    dispatch(signupUser(userData,null));
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter">
      <div className="bg-white max-w-md w-full text-center p-10 rounded-xl shadow-md">
        <img
          src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
          alt="Check Email"
          className="w-20 mx-auto mb-6"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Check Your Email (Spam Folder)
        </h1>
        <p className="text-gray-600 mb-6">
          We’ve sent a confirmation link to your email. Please check your inbox and follow the link to continue.
        </p>
        {/* <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          Back to Home
        </a> */}
        <div className="mt-6 text-sm text-gray-600">
          Didn’t receive the email?{' '}
          <button onClick={handleClick} className="text-blue-600 font-medium hover:underline">
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
