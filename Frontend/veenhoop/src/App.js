import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import logo from './images/logo_blop.png';
import './styles/App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Cijfers from './pages/Cijfers';
import Blokken from './pages/Blokken';
import CijfersToe from './pages/Cijfers-toevoegen';
import Klassen from './pages/klassen';
import Settings from './pages/Settings';

// Header component
function Header() {
  const navigate = useNavigate();

  return (
    <>
    <header className='z-50 w-screen bg-cyan-700 drop-shadow-lg'>
      <img src={logo} className="h-40 auto w-" alt="logo" onClick={() => navigate('/Home')} />
      <div className='absolute top-10 left-[200px] text-center'>
        <p className='text-6xl text-white font-schoolbell'><strong>De VeenHoop</strong></p>
        <p className='text-xl text-white font-shadows'>School voor voortgezet onderwijs</p>
      </div>
    </header>
    </>
  );
}

function Footer() {
  const navigate = useNavigate();

  return (
    <>
    <footer className='absolute bottom-0 w-screen py-4 bg-gray-200' >
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
          <Route path="/Home" element={<Home />} />
          <Route path="/Cijfers" element={<Cijfers />} />
          <Route path='/Blokken' element={<Blokken/>} />
          <Route path='/Cijfers-toevoegen' element={<CijfersToe/>} />
          <Route path='/Klassen' element={<Klassen/>} />
          <Route path='/Settings' element={<Settings/>} />
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
