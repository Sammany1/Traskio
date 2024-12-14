import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleAccountSelection = (option) => {
    if (option === "profile") navigate("/profile");
    if (option === "logout") navigate("/");
  };

  const handleFiltrationSelection = (filter) => {
    console.log(`Selected filter: ${filter}`);
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
        <h1>My Website</h1>
      </div>
      <div className="dropdown-container">
        {/* Account Dropdown */}
        <div className="dropdown">
          <button className="dropbtn">Account</button>
          <div className="dropdown-content">
            <span onClick={() => handleAccountSelection("profile")}>My Profile</span>
            <span onClick={() => handleAccountSelection("logout")}>Logout</span>
          </div>
        </div>

        {/* Filtration Dropdown */}
        <div className="dropdown">
          <button className="dropbtn">Filtration</button>
          <div className="dropdown-content">
            <span onClick={() => handleFiltrationSelection("filter1")}>Filter 1</span>
            <span onClick={() => handleFiltrationSelection("filter2")}>Filter 2</span>
            <span onClick={() => handleFiltrationSelection("filter3")}>Filter 3</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
