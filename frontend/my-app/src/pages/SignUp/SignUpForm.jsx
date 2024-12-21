'use client';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import '../../styles/globals.css?v=1';
import './Signup.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await userService.signup({ username, email, password });
      console.log('Sign-up response:', response);
      if (response.message === 'User created successfully') {
        navigate('/login');
      } else {
        setError('Sign-up failed. Please try again.');
      }
    } catch (err) {
      console.error('Sign-up error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="signupContainer">
      <div className="card formContainer">
        <h2 className="title">Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="form">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              placeholder="Enter your username" 
            />
          </div>
          <div className="form">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email" 
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
          <div className="form">
            <label>Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              placeholder="Confirm your password" 
            />
          </div>
          <button type="submit" className="button formButton">Sign Up</button>
        </form>
        <div>
          <p>Already have an account? <Link to="/login">Login to your account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
