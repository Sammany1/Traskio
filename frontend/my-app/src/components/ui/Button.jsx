import React from 'react';
import './Button.css'; 

const Button = ({ children, type = 'button' }) => {
  return (
    <button type={type} className="button">
      {children}
    </button>
  );
};

export default Button;
