import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import logo from './images/logo.png';
import './styles/App.css';
import Login from './pages/Login'; // Ensure Home is properly exported from Home.js

// Header component
function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <img src={logo} className="logo" alt="logo" onClick={() => navigate('/')} />
    </header>
  );
}

// Main App component
function App() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

// App wrapped with Router
function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWithRouter;
