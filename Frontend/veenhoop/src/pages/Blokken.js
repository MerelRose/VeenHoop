import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import '../styles/App.css';
import SideNav from './components/side-nav';

function Blokken() {
  return (
    <>
    <SideNav/>
    <div className='absolute top-[17%] w-[80%] left-[12%]'>
        blokken
    </div>
    </>
  );
}
  
export default Blokken;