"use client";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer"; 
import HomePage from "../pages/Home/HomePage";
import LoginForm from "../pages/Login/LoginForm";
import SignUpForm from "../pages/SignUp/SignUpForm";
import ToDoPage from "../pages/MainApp/ToDos/ToDosPage";
import ProfilePage from "../pages/Profile/profilepage";
import '../styles/globals.css';
import { FilterProvider } from '../context/FilterContext';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = () => {
    setSearchQuery(''); // Reset search query
    setShowSearch(false); // Hide search bar
  };

  return (
    <FilterProvider>
      <Router>
        <Header 
          setSearchQuery={setSearchQuery} 
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/todos" element={<ToDoPage searchQuery={searchQuery} />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </Router>
    </FilterProvider>
  );
};

export default App;
