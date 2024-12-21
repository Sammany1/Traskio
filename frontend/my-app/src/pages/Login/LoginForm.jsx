'use client';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import '../../styles/globals.css?v=1';
import './loginpage.css';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login({ identifier, password });
      console.log('Login response:', response);
      // Handle successful login (e.g., save user data, update context)
      navigate('/todos');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="loginContainer">
      <div className="card formContainer">
        <h2 className="title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form">
            <label>Username or Email</label>
            <input 
              type="text" 
              value={identifier} 
              onChange={(e) => setIdentifier(e.target.value)} 
              required 
              placeholder="Enter your username or email" 
            />
          </div>
          <div className="form">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Enter your password" 
            />
          </div>
          {/* <div>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div> */}
          <button type="submit" className="button formButton">Login</button>
        </form>
        <div>
          <p>Don't have an account? <Link to="/signup">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
