import React from "react";
function Login() {
  return (
    <>
    <div className="container1">
      <div className="header1">
        <div className="underline">
          <div className="inputs1">
            <div className="input1">
              <input type="text" placeholder="Enter your Username"/>
            </div>
            <div className="input1">
              <input type="email" placeholder="Enter your email-id"/>
            </div>
            <div className="input1">
             
              <input type="password" placeholder="Enter a password"/>
            </div>
          </div>
        </div>
        {/* <div className="forgot-password">Forgot Password?</div> */}
        <div className="submit-container">
          <div className="submit">Log In</div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
