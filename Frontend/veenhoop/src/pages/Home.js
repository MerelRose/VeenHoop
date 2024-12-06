import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import '../styles/App.css';
import SideNav from './components/side-nav';

function Home() {
  return (
    <>
    <SideNav/>
    <div className='absolute top-[17%] w-[80%] left-[12%]'>
    did you know that when ever you french fries on ketchup taste ketchup fries you? this this is because ketchup n taste fries on ketchup is reference to taste french fries on you taste
    </div>
    </>
  );
}
  
export default Home;
