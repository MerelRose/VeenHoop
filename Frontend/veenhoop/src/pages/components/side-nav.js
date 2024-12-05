import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';


const SideNav = () => {
  const navigate = useNavigate();
  return (
    <div className='h-[720px] bg-gradient-to-t from-lichtblauw to-donkerblauw w-52'>
        <button className="h-16 text-lg text-white transition duration-200 transform border font-Rubik border-b-donkerblauw border-x-lichtblauw w-52 border-t-lichtblauw hover:scale-105 hover:bg-donkerblauw hover:text-white" onClick={() => navigate('/Home')}>Home</button><br/>
        <button className="h-16 text-lg text-white transition duration-200 transform border font-Rubik border-b-donkerblauw border-x-lichtblauw w-52 border-t-lichtblauw hover:scale-105 hover:bg-donkerblauw hover:text-white" onClick={() => navigate('/Cijfers')}>Mijn Cijfers</button><br/>
        <button className="h-16 text-lg text-white transition duration-200 transform border font-Rubik border-b-donkerblauw border-x-lichtblauw w-52 border-t-lichtblauw hover:scale-105 hover:bg-donkerblauw hover:text-white" onClick={() => navigate('/Cijfers-toevoegen')}>Cijfers Toevoegen</button><br/>
        <button className="h-16 text-lg text-white transition duration-200 transform border font-Rubik border-b-donkerblauw border-x-lichtblauw w-52 border-t-lichtblauw hover:scale-105 hover:bg-donkerblauw hover:text-white" onClick={() => navigate('/Blokken')}>Blokken</button><br/>
        <button className="h-16 text-lg text-white transition duration-200 transform border font-Rubik border-b-donkerblauw border-x-lichtblauw w-52 border-t-lichtblauw hover:scale-105 hover:bg-donkerblauw hover:text-white" onClick={() => navigate('/Klassen')}>Klassen Overzicht</button><br/>
        <button className="h-16 text-lg text-white transition duration-200 transform border font-Rubik border-b-donkerblauw border-x-lichtblauw w-52 border-t-lichtblauw hover:scale-105 hover:bg-donkerblauw hover:text-white" onClick={() => navigate('/Settings')}>Settings</button><br/>
        <button className="text-white h-16 text-lg transition duration-200 transform border top-[87%] absolute font-Rubik border-y-donkerblauw border-x-lichtblauw w-52 hover:scale-105 hover:bg-donkerblauw hover:text-white">Uitloggen</button>
      </div>
  )};
export default SideNav; 