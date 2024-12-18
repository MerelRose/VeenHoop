import React from 'react';
import { useNavigate } from 'react-router-dom';

const SideNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token and role from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Redirect to the home page
    navigate('/');
  };

  return (
    <div className='flex-1 h-[720px] bg-gradient-to-t from-lichtblauw to-donkerblauw w-52'>
      <button className="h-16 text-lg text-white transition duration-200 transform border font-Rubik border-b-donkerblauw border-x-lichtblauw w-52 border-t-lichtblauw hover:scale-105 hover:bg-donkerblauw hover:text-white" onClick={() => navigate('/Home')}>Home</button><br/>
      <button className="h-16 text-lg text-white transition duration-200 transform border font-Rubik border-b-donkerblauw border-x-lichtblauw w-52 border-t-lichtblauw hover:scale-105 hover:bg-donkerblauw hover:text-white" onClick={() => navigate('/Cijfers')}>Mijn Cijfers</button><br/>
      <button className="h-16 text-lg text-white transition duration-200 transform border font-Rubik border-b-donkerblauw border-x-lichtblauw w-52 border-t-lichtblauw hover:scale-105 hover:bg-donkerblauw hover:text-white" onClick={() => navigate('/Cijfers-toevoegen')}>Cijfers Toevoegen</button><br/>
      <button className="h-16 text-lg text-white transition duration-200 transform border font-Rubik border-b-donkerblauw border-x-lichtblauw w-52 border-t-lichtblauw hover:scale-105 hover:bg-donkerblauw hover:text-white" onClick={() => navigate('/Blokken')}>Blokken</button><br/>
      <button className="h-16 text-lg text-white transition duration-200 transform border font-Rubik border-b-donkerblauw border-x-lichtblauw w-52 border-t-lichtblauw hover:scale-105 hover:bg-donkerblauw hover:text-white" onClick={() => navigate('/Klassen')}>Klassen Overzicht</button><br/>
      <button className="h-16 text-lg text-white transition duration-200 transform border font-Rubik border-b-donkerblauw border-x-lichtblauw w-52 border-t-lichtblauw hover:scale-105 hover:bg-donkerblauw hover:text-white" onClick={() => navigate('/Historische')}>Historische</button><br/>
      <button className="h-16 text-lg text-white transition duration-200 transform border font-Rubik border-b-donkerblauw border-x-lichtblauw w-52 border-t-lichtblauw hover:scale-105 hover:bg-donkerblauw hover:text-white" onClick={() => navigate('/Settings')}>Settings</button><br/>
      <button className="h-16 text-lg text-white transition duration-200 transform border font-Rubik border-b-donkerblauw border-x-lichtblauw w-52 border-t-lichtblauw hover:scale-105 hover:bg-donkerblauw hover:text-white" onClick={handleLogout}>Uitloggen</button>
    </div>
  );
};

export default SideNav;