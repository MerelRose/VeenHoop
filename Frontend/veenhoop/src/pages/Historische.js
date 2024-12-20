import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../styles/App.css';
import SideNav from './components/side-nav';

const API_KEY = 'VeenHoop_APIKEY_G123242JDD224jJnndjh2774hdDJJWeruu338hu32fnfh'; // Replace with your actual API key

function HistorischeCijfers() {
  const [historische, setHistorische] = useState([]);
  const [leerlingen, setLeerlingen] = useState([]);
  const [klassen, setKlassen] = useState([]);
  const [vakken, setVakken] = useState([]);

  useEffect(() => {
    // Fetch historical data
    const fetchHistorische = async () => {
      try {
        const response = await axios.get('http://localhost:3001/historische', {
          headers: {
            'x-api-key': `${API_KEY}`
          }
        });
        console.log('Historische data:', response.data); // Log the response
        setHistorische(response.data);
      } catch (error) {
        console.error('Error fetching historische:', error);
      }
    };

    // Fetch leerlingen data
    const fetchLeerlingen = async () => {
      try {
        const response = await axios.get('http://localhost:3001/leerlingen/all', {
          headers: {
            'x-api-key': `${API_KEY}`
          }
        });
        console.log('Leerlingen data:', response.data); // Log the response
        setLeerlingen(response.data);
      } catch (error) {
        console.error('Error fetching leerlingen:', error);
      }
    };

    // Fetch klassen data
    const fetchKlassen = async () => {
      try {
        const response = await axios.get('http://localhost:3001/klassen', {
          headers: {
            'x-api-key': `${API_KEY}`
          }
        });
        console.log('Klassen data:', response.data); // Log the response
        setKlassen(response.data);
      } catch (error) {
        console.error('Error fetching klassen:', error);
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

    fetchHistorische();
    fetchLeerlingen();
    fetchKlassen();
    fetchVakken();
  }, []);

  const getLeerlingNaam = (leerling_id) => {
    const leerling = leerlingen.find(l => l.leerling_id === leerling_id);
    return leerling ? leerling.name : 'Unknown';
  };

  const getKlasNaam = (klas_id) => {
    const klas = klassen.find(k => k.klas_id === klas_id);
    return klas ? klas.naam : 'Unknown';
  };

  const getVakNaam = (vak_id) => {
    const vak = vakken.find(v => v.vak_id === vak_id);
    return vak ? vak.naam : 'Unknown';
  };

  return (
    <>
      <SideNav />
      <div className='absolute flex-1 top-44 w-fit left-56'>
        <h1>Historische Cijfers</h1>
        <table>
          <thead>
            <tr>
              <th>Historisch ID</th>
              <th>Leerling Naam</th>
              <th>Klas Naam</th>
              <th>Vak Naam</th>
              <th>Cijfer</th>
              <th>Aangemaakt Op</th>
              <th>Historisch Opgeslagen Op</th>
            </tr>
          </thead>
          <tbody>
            {historische.map(item => (
              <tr key={item.historisch_id}>
                <td>{item.historisch_id}</td>
                <td>{getLeerlingNaam(item.leerling_id)}</td>
                <td>{getKlasNaam(item.klas_id)}</td>
                <td>{getVakNaam(item.vak_id)}</td>
                <td>{item.cijfer}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
                <td>{new Date(item.historical_saved_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HistorischeCijfers;
