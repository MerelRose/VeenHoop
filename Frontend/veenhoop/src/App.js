import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // Importing necessary components
import logo from './images/logo_blop.png';
import './styles/App.css';
import { AuthProvider, useAuth } from './AuthContext'; // Assuming useAuth is exported from AuthContext
import Home from './pages/Home';
import Login from './pages/Login';
import Cijfers from './pages/Cijfers';
import Blokken from './pages/Blokken';
import CijfersToe from './pages/Cijfers-toevoegen';
import Klassen from './pages/klassen';
import Settings from './pages/Settings';
import Historische from './pages/Historische';

// Header component
function Header() {
  const navigate = useNavigate();

  return (
    <header className='z-50 w-screen bg-cyan-700 drop-shadow-lg'>
      <img src={logo} className="h-40 auto w-" alt="logo" onClick={() => navigate('/home')} />
      <div className='absolute top-10 left-[200px] text-center'>
        <p className='text-6xl text-white font-schoolbell'><strong>De VeenHoop</strong></p>
        <p className='text-xl text-white font-shadows'>School voor voortgezet onderwijs</p>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className='absolute bottom-0 w-screen py-4 bg-gray-200'>
      <hr />
      <p className='text-center'>©2024 De VeenHoop, All rights reserved</p>
    </footer>
  );
}

// Main App component
const App = () => {
  const { isAuthenticated } = useAuth(); // Get authentication status from context

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="/cijfers" element={isAuthenticated ? <Cijfers /> : <Navigate to="/" />} />
        <Route path="/blokken" element={isAuthenticated ? <Blokken /> : <Navigate to="/" />} />
        <Route path="/cijfers-toevoegen" element={isAuthenticated ? <CijfersToe /> : <Navigate to="/" />} />
        <Route path="/klassen" element={isAuthenticated ? <Klassen /> : <Navigate to="/" />} />
        <Route path="/Historische" element={isAuthenticated ? <Historische /> : <Navigate to="/" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
};

// App wrapped with AuthProvider only
const AppWithRouter = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWithRouter;