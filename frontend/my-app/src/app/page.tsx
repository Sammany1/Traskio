"use client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer"; // Import the Footer component
import HomePage from "../pages/Home/HomePage";
import ProfilePage from "../pages/Profilepage/Profilepage";
import LoginForm from "../pages/Login/LoginForm";
import SignUpForm from "../pages/SignUp/SignUpForm";
import ToDoPage from "../pages/ToDos/ToDosPage";
import '../styles/globals.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
      <Footer /> {/* Add Footer here */}
    </Router>
  );
};

export default App;
