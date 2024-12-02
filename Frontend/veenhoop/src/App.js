import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import logo from './images/logo_blop.png';
import './styles/App.css';
import Login from './pages/Login'; // Ensure Home is properly exported from Home.js

// Header component
function Header() {
  const navigate = useNavigate();

  return (
    <header className='w-screen bg-cyan-700'>
      <img src={logo} className="w-48 h-auto" alt="logo" onClick={() => navigate('/')} />
      <h1>Login</h1>
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
