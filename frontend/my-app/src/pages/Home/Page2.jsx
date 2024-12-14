import React, { useState } from 'react';
import './page2.css';

const Calendar = ({ selectedDate, onSelectDate }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString("default", { month: "long" });
  const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();
  const startDay = new Date(year, today.getMonth(), 1).getDay();

  const daysArray = [...Array(startDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="calendar">
      <h2>{`${month.toUpperCase()} ${year}`}</h2>
      <div className="calendar-grid">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div key={day} className={`calendar-day ${day === "SUN" ? "highlight" : ""}`}>
            {day}
          </div>
        ))}
        {daysArray.map((day, index) => (
          <div
            key={index}
            className={`calendar-date ${day === selectedDate ? "selected" : ""} ${day === today.getDate() ? "today" : ""}`}
            onClick={() => onSelectDate(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

const Notes = () => {
  return (
    <textarea
      className="note-textarea"
      placeholder="Write your T0-Do list here..."
    ></textarea>
  );
};

const Page2 = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="app-container">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "schedule" ? "active" : ""}`}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule
        </button>
        <button
          className={`tab-button ${activeTab === "note" ? "active" : ""}`}
          onClick={() => setActiveTab("note")}
        >
          To-Do List
        </button>
      </div>

      <div className="content">
        {activeTab === "schedule" && (
          <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        )}
        {activeTab === "note" && <Notes />}
      </div>
    </div>
  );
};

export default Page2;