import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import '../styles/App.css';
import SideNav from './components/side-nav';

function Settings() {
  return (
    <>
    <SideNav/>
    <div className='absolute flex-1 top-44 w-fit left-56'>
        settings
    </div>
    </>
  );
}
  
export default Settings;