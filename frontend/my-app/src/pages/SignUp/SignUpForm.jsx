'use client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const SignUpForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle sign up logic here (e.g., validate fields and submit)
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
              placeholder="Enter your full name" 
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email" 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Enter your password" 
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              placeholder="Confirm your password" 
            />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <div className="login-link">
          <p>Already have an account? <Link to="/login">Login to your account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
