import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import '../styles/App.css';
import SideNav from './components/side-nav';

function Home() {
  return (
    <>
    <SideNav/>
    <div className='absolute top-[17%] w-[80%] left-[12%]'></div>
    </>
  );
}
  
export default Home;
