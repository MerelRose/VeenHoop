import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import logo from './images/logo_blop.png';
import './styles/App.css';
import Login from './pages/Login'; // Ensure Home is properly exported from Home.js

// Header component
function Header() {
  const navigate = useNavigate();

  return (
    <>
    <header className='w-screen bg-cyan-700 drop-shadow-lg'>
      <img src={logo} className="w-48 h-auto" alt="logo" onClick={() => navigate('/')} />
      <div className='absolute top-10 left-[200px] text-center'>
        <p className='font-schoolbell text-6xl text-white'><strong>De VeenHoop</strong></p>
        <p className='font-shadows text-xl text-white'>School voor voortgezet onderwijs</p>
      </div>
    </header>
    </>
  );
}

function Footer() {
  const navigate = useNavigate();

  return (
    <>
    <footer className='w-screen bg-gray-200 py-4 bottom-0 absolute' >
      <hr/>
      <p className='text-center'>©2024 De VeenHoop, All rights reserved</p>
    </footer>
    </>
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
      <Footer />
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
