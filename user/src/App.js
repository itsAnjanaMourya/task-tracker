import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContextProvider } from './context/authContext';
function App() {
  return (
    <div className="App">
    <AuthContextProvider>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
