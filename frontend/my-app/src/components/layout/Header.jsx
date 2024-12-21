"use client";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; 
import "../../styles/header.css";

const Header = () => {
  const [showAuthLinks, setShowAuthLinks] = useState(true);
  const location = useLocation();

  const renderLinks = () => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      return (
        <>
          <Link to="/" className="nav-link">
            Home
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
            <Link to="/" className="dropdown-item">
              Logout
            </Link>
          </div>
        </div>
      );
    }

    if (location.pathname === "/profile") {
      return (
        <Link to="/todos" className="nav-link">
          Dashboard
        </Link>
      );
    }

    if (showAuthLinks) {
      return (
        <>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <hr className="divider" />
          <Link to="/signup" className="nav-link">
            Signup
          </Link>
        </>
      );
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setShowAuthLinks(true);
    }
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="logo">Task Tracker</div>
      <nav className="nav">{renderLinks()}</nav>
    </header>
  );
};

export default Header;
