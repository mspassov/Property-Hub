import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../../assets/svg/visibilityIcon.svg";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={loginInfo.email}
            autoComplete="on"
            onChange={(e) =>
              setLoginInfo((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="passwordInput"
              id="password"
              autoComplete="on"
              value={loginInfo.password}
              onChange={(e) =>
                setLoginInfo((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
            />
            <img
              src={visibilityIcon}
              alt="Show Password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <Link to="/reset-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill="white" width="34px" height="34px" />
            </button>
          </div>
        </form>

        <Link to="/signup" className="registerLink">
          Don't have an account? Sign up!
        </Link>
      </div>
    </>
  );
};

export default SignIn;
