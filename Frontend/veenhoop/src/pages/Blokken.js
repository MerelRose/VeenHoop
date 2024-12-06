import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../styles/App.css';
import SideNav from './components/side-nav';

const API_KEY = 'VeenHoop_APIKEY_G123242JDD224jJnndjh2774hdDJJWeruu338hu32fnfh'; // Replace with your actual API key

function Blokken() {
  const [blokken, setBlokken] = useState([]);
  const [vakken, setVakken] = useState([]);
  const [docenten, setDocenten] = useState([]);

  useEffect(() => {
    // Fetch blokken data
    const fetchBlokken = async () => {
      try {
        const response = await axios.get('http://localhost:3001/blokken', {
          headers: {
            'x-api-key': `${API_KEY}` 
          }
        });
        console.log('Blokken data:', response.data); // Log the response
        setBlokken(response.data); // Set the correct state
      } catch (error) {
        console.error('Error fetching blokken:', error);
      }
    };

    // Fetch vakken data
    const fetchVakken = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vakken', {
          headers: {
            'x-api-key': `${API_KEY}` 
          }
        });
        console.log('Vakken data:', response.data); // Log the response
        setVakken(response.data);
      } catch (error) {
        console.error('Error fetching vakken:', error);
      }
    };

    // Fetch docenten data
    const fetchDocenten = async () => {
      try {
        const response = await axios.get('http://localhost:3001/docenten', {
          headers: {
            'x-api-key': `${API_KEY}` 
          }
        });
        console.log('Docenten data:', response.data); // Log the response
        setDocenten(response.data);
      } catch (error) {
        console.error('Error fetching docenten:', error);
      }
    };

    fetchBlokken();
    fetchVakken();
    fetchDocenten();
  }, []);

  // Function to get vak naam by vak_id
  const getVakNaam = (vak_id) => {
    const vak = vakken.find(v => v.vak_id === vak_id);
    return vak ? vak.naam : 'Unknown';
  };

  // Function to get docent naam by docent_id
  const getDocentNaam = (docent_id) => {
    const docent = docenten.find(d => d.docent_id === docent_id);
    return docent ? docent.name : 'Unknown';
  };

  return (
    <>
      <SideNav />
      <div className='absolute top-[17%] w-[80%] left-[12%]'>
        <h1>Blokken</h1>
        <table>
          <thead>
            <tr>
              <th>Blok ID</th>
              <th>Vak Naam</th>
              <th>Docent Naam</th>
              <th>Gemiddelde Cijfer</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {blokken.map(blok => (
              <tr key={blok.blok_id}>
                <td>{blok.blok_id}</td>
                <td>{getVakNaam(blok.vak_id)}</td>
                <td>{getDocentNaam(blok.docent_id)}</td>
                <td>{blok.gemiddelde_cijfer}</td>
                <td>{new Date(blok.created_at).toLocaleString()}</td>
                <td>{new Date(blok.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 </>
  );
}

export default Blokken;