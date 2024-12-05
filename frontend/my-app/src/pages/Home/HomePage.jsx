import React, { useState, useEffect } from 'react';
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
      <h1 className="slogan">Stay Organized, Stay Ahead</h1>
      <div className="time">
        <h2>Current Time: {currentTime}</h2>
      </div>
      <TaskSummary />
      <div className="features">
        <h3>App Features</h3>
        <ul>
          <li>Organize tasks and projects easily</li>
          <li>Stay on top of your deadlines</li>
          <li>Get reminders and notifications</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
