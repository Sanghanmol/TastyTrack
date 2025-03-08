import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">🥗 Tasty Track</h1>
      <Link to="/add-recipe" className="add-recipe-btn">
        <FaPlus className="plus-icon" /> Add Recipe
      </Link>
    </nav>
  );
};

export default Navbar;
