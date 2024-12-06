'use client';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';
import TaskSummary from './TaskSummary';

const HomePage = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentTime = time.toLocaleTimeString();

  return (
    <div className="homepage-container">
      {/* Auth Links */}
      <div className="auth-links">
        <Link to="/login" className="auth-link">LOGIN</Link>
        <span className="divider">|</span>
        <Link to="/signup" className="auth-link">SIGNUP</Link>
      </div>

      <div className="main-content">
        {/* Left Column */}
        <div className="text-container">
          <h1 className="slogan">Stay Organized, Stay Ahead</h1>
          <div className="time">
            <h2>{currentTime}</h2>
          </div>
          
          {/* Features Boxes */}
          <div className="features-container">
            <div className="feature-box">
              <h3 className="feature-title">Organize Tasks</h3>
              <p>Keep your tasks well-organized and easy to manage.</p>
            </div>
            <div className="feature-box">
              <h3 className="feature-title">Stay on Top</h3>
              <p>Track deadlines and never miss an important task.</p>
            </div>
            <div className="feature-box">
              <h3 className="feature-title">Get Reminders</h3>
              <p>Receive notifications for upcoming deadlines and tasks.</p>
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="sign-up-btn-container">
            <Link to="/signup" className="sign-up-btn">Sign Up Now</Link>
          </div>
        </div>

        {/* Right Column (Image) */}
        <div className="image-container">
          <img src="https://www.tfpublishing.com/cdn/shop/files/AY25-8212-5.jpg?v=1706559136" alt="App Purpose" className="app-image" />
        </div>
      </div>

    </div>
  );
};

export default HomePage;
