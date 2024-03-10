import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Explore from "./components/pages/Explore";
import Category from "./components/pages/Category";
import ForgotPassword from "./components/pages/ForgotPassword";
import Offers from "./components/pages/Offers";
import Profile from "./components/pages/Profile";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Navbar from "./components/Navbar";
import CreateListing from "./components/pages/CreateListing";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/create" element={<CreateListing />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
        </Routes>
        <Navbar />
      </Router>

      <ToastContainer />
    </>
  );
};

export default App;
