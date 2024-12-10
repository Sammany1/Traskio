import React, { useState } from 'react';
import './page2.css';

const Calendar = ({ selectedDate, onSelectDate }) => {
    const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <div className="calendar">
            <h2>SEPTEMBER 2021</h2>
            <div className="calendar-grid">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                    <div key={day} className={`calendar-day ${day === 'SUN' ? 'highlight' : ''}`}>
                        {day}
                    </div>
                ))}
                {daysInMonth.map((day) => (
                    <div
                        key={day}
                        className={`calendar-date ${day === selectedDate ? 'selected' : ''}`}
                        onClick={() => onSelectDate(day)}
                    >
                        {day}
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
            placeholder="Write your note here..."
        ></textarea>
    );
};

const CalendarNoteApp = () => {
    const [activeTab, setActiveTab] = useState('schedule');
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <div className="app-container">
            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === 'schedule' ? 'active' : ''}`}
                    onClick={() => setActiveTab('schedule')}
                >
                    Schedule
                </button>
                <button
                    className={`tab-button ${activeTab === 'note' ? 'active' : ''}`}
                    onClick={() => setActiveTab('note')}
                >
                    Note
                </button>
            </div>

            <div className="content">
                {activeTab === 'schedule' && (
                    <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                )}
                {activeTab === 'note' && <Notes />}
            </div>
        </div>
    );
};

export default CalendarNoteApp;

