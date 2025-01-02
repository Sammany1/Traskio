'use client';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/globals.css?v=1';
import './homepage.css';

const HomePage = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentTime = time.toLocaleTimeString('en-GB', { hour12: false });

  return (
    <div className="homepage-container">

      <div className="main-content">
        {/* Left Column (Time) */}
        <div className="time-container">
          <h2>{currentTime}</h2>
        </div>

        {/* Right Column (Text) */}
        <div className="text-container">
          <h1 className="slogan">Stay Organized, Stay Ahead</h1>

          {/* Features Boxes */}
          <div className="features-container">
            <div className="card ho">
              <h3 className="card-title">Stay On Track</h3>
              <p>Monitor your progress with a real-time progress bar and stay motivated</p>
            </div>
            <div className="card ho">
              <h3 className="card-title">Manage Tasks Effortlessly</h3>
              <p>Easily add, organize, and track tasks with a simple and intuitive interface</p>
            </div>
            <div className="card ho">
              <h3 className="card-title">Stay Focused</h3>
              <p>Filter and search tasks to focus on what matters most at any time</p>
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="sign-up-btn-container">
            <Link to="/signup" className="button">Sign Up Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
