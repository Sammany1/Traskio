"use client";
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom"; 
import '../../styles/globals.css';
import "../../styles/header.css";
import { FilterContext } from '../../context/FilterContext';

const Header = ({ setSearchQuery, showSearch, setShowSearch, onLogout }) => {
  const { filter, setFilter } = useContext(FilterContext);
  const [showAuthLinks, setShowAuthLinks] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [searchQuery, setSearchQueryLocal] = useState("");
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearchQueryLocal(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    setSearchQueryLocal(""); // Reset local search query
    setShowSearch(false); // Hide search bar
    onLogout(); // Call parent's logout handler
  };

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
        <>
          <div className="search-container">
            <div
              className="search-icon nav-link"
              onClick={() => setShowSearch(!showSearch)}
            >
              <i className="fa fa-search"></i>
            </div>
            {showSearch && (
              <input
                className="input"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            )}
          </div>
          <div
            className="nav-link dropdown"
            onMouseEnter={() => setShowFilterDropdown(true)}
            onMouseLeave={() => setShowFilterDropdown(false)}
          >
            <span>{filter} </span>
            <span className="down-arrow"></span>
            {showFilterDropdown && (
              <div className="dropdown-menu">
                <div
                  className="dropdown-item"
                  onClick={() => setFilter("All")}
                >
                  All
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => setFilter("Done")}
                >
                  Done
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => setFilter("In Progress")}
                >
                  In Progress
                </div>
              </div>
            )}
          </div>
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
              <Link to="/" className="dropdown-item" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        </>
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
            Sign-up
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <img src="/logo.png" alt="Logo" className="logo-img" />
          Traskio
        </div>
      <nav className="nav">{renderLinks()}</nav>
    </header>
  );
};

export default Header;
