"use client";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [showAuthLinks, setShowAuthLinks] = useState(true); 
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/"); 
  };

  const renderLinks = () => {
    
    if (location.pathname === "/login" || location.pathname === "/signup") {
      return (
        <>
          <button className="nav-link" onClick={handleHomeClick}>
             Home Page
          </button>
        </>
      );
    }

    if (showAuthLinks) {
      return (
        <>
          <Link to="/login" className="nav-link">
             Login
          </Link>
          <Link to="/signup" className="nav-link">
             Signup
          </Link>
        </>
      );
    }

    if (location.pathname === "/todos") {
      return (
        <div
          className="nav-link dropdown"
          onMouseEnter={() => setShowAuthLinks(false)}
          onMouseLeave={() => setShowAuthLinks(false)}
        >
          Account
          <div className="dropdown-menu">
            <Link to="/profile" className="dropdown-item">
               Profile
            </Link>
            <Link to="/logout" className="dropdown-item">
              Logout
            </Link>
          </div>
        </div>
      );
    }

    return (
      <>
        <button className="nav-link" onClick={() => setShowAuthLinks(true)}>
           Home
        </button>
        <Link to="/todos" className="nav-link">
           ToDos
        </Link>
      </>
    );
  };

  return (
    <header className="header">
      <div className="logo">Task Tracker</div>
      <nav className="nav">{renderLinks()}</nav>
    </header>
  );
};

export default Header;
