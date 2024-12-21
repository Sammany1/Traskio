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

  const currentTime = time.toLocaleTimeString();

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
              <h3 className="card-title">Organize Tasks</h3>
              <p>Keep your tasks well-organized and easy to manage.</p>
            </div>
            <div className="card ho">
              <h3 className="card-title">Keep up to date</h3>
              <p>Track deadlines and never miss an important task.</p>
            </div>
            <div className="card ho">
              <h3 className="card-title">Get Reminders</h3>
              <p>Receive notifications for upcoming deadlines.</p>
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
