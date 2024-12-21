import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/privacy-policy" className="footer-link">
          Privacy Policy
        </Link>
        <Link to="/terms-of-service" className="footer-link">
          Terms of Service
        </Link>
        <Link to="/contact-us" className="footer-link">
          Contact Us
        </Link>
      </div>
      <p className="footer-text">© 2024 Task Tracker. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
