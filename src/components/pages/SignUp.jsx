import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../../assets/svg/visibilityIcon.svg";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerInfo, setLoginInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form>
          <input
            type="text"
            className="nameInput"
            placeholder="Full Name"
            id="name"
            autoComplete="on"
            value={registerInfo.name}
            onChange={(e) =>
              setLoginInfo((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            autoComplete="on"
            value={registerInfo.email}
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
              value={registerInfo.password}
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
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="white" width="34px" height="34px" />
            </button>
          </div>
        </form>

        <Link to="/signin" className="registerLink">
          Sign In Instead!
        </Link>
      </div>
    </>
  );
};

export default SignUp;
