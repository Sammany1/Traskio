import React from 'react';

const ProgressBar = ({ progress }) => {
  const progressBarStyle = {
    width: '100%',
    height: '10px',
    backgroundColor: '#e0e0e0', 
    borderRadius: '5px',
    marginTop: '10px',
  };

  const filledBarStyle = {
    height: '100%',
    backgroundColor: '#4caf50', 
    borderRadius: '5px',
    width: `${progress}%`, 
    transition: 'width 0.3s ease-in-out', 
  };

  return (
    <div style={progressBarStyle}>
      <div style={filledBarStyle}></div>
    </div>
  );
};

export default ProgressBar;
