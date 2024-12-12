'use client';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import LoginForm from "../pages/Login/LoginForm";
import SignUpForm from "../pages/SignUp/SignUpForm";
import ToDoPage from "../pages/ToDos/ToDosPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/todos" element={<ToDoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
