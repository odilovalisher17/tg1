import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="my-navbar">
      <NavLink to="/">
        <img src="/image/logo.jpg" alt="" />
      </NavLink>
    </div>
  );
};

export default Navbar;
