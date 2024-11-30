import React from 'react';
<<<<<<< HEAD

const Button = ({ onClick, label }) => (
  <button onClick={onClick}>{label}</button>
);
=======
import './Button.css'; 

const Button = ({ children, type = 'button' }) => {
  return (
    <button type={type} className="button">
      {children}
    </button>
  );
};
>>>>>>> 3db4b8bc139d3a32701bb9bc8b7c7297a5219b8a

export default Button;
