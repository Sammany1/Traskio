"use client";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; 
import "../../styles/header.css";

const Header = () => {
  const [showAuthLinks, setShowAuthLinks] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
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
        <>
          <div
            className="nav-link dropdown"
            onMouseEnter={() => setShowFilterDropdown(true)}
            onMouseLeave={() => setShowFilterDropdown(false)}
          >
            <span>{selectedFilter} </span>
            <span className="down-arrow"></span>
            {showFilterDropdown && (
              <div className="dropdown-menu">
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedFilter("All");
                    setShowFilterDropdown(false);
                  }}
                >
                  All
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedFilter("Done");
                    setShowFilterDropdown(false);
                  }}
                >
                  Done
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedFilter("In Progress");
                    setShowFilterDropdown(false);
                  }}
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
              <Link to="/" className="dropdown-item">
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
