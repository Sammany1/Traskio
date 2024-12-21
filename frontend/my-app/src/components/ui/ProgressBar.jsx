import React from 'react';

const ProgressBar = ({ progress }) => {
  const progressBarStyle = {
    width: '100%',
    height: '10px',
    backgroundColor: '#778fb3', 
    borderRadius: '5px',
    marginTop: '10px',
  };

  const filledBarStyle = {
    height: '100%',
    backgroundColor: 'rgb(128, 178, 128)', 
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
