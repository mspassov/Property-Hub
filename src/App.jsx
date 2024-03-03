import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./components/pages/Explore";
import ForgotPassword from "./components/pages/ForgotPassword";
import Offers from "./components/pages/Offers";
import Profile from "./components/pages/Profile";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<SignIn />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
        </Routes>
        <Navbar />
      </Router>
    </>
  );
};

export default App;
