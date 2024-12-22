import React from 'react';
import '../../../styles/globals.css'

const ToggleButton = ({ activeTab, setActiveTab }) => {
  return (
    <div className="">
      <button
        className={`"button" ${activeTab === "schedule" ? "active" : ""}`}
        onClick={() => setActiveTab("schedule")}
      >
        Schedule
      </button>
      <button
        className={`"button" ${activeTab === "todo" ? "active" : ""}`}
        onClick={() => setActiveTab("todo")}
      >
        ToDos
      </button>
    </div>
  );
};

export default ToggleButton;
