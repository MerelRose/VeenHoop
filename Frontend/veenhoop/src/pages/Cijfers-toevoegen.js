import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNav from './components/side-nav';

const CijfersInvoer = () => {
    const [klas, setKlas] = useState('');
    const [vak, setVak] = useState('');
    const [leerlingen, setLeerlingen] = useState([]);
    const [selectedLeerlingen, setSelectedLeerlingen] = useState({});
    const [klassen, setKlassen] = useState([]);
    const [vakken, setVakken] = useState([]);

    const API_KEY = "VeenHoop_APIKEY_G123242JDD224jJnndjh2774hdDJJWeruu338hu32fnfh"; // Your API key

    useEffect(() => {
        // Haal klassen en vakken op bij het laden van de component
        const fetchData = async () => {
            const klassenRes = await axios.get('http://localhost:3001/klassen', {headers: {
              'x-api-key': `${API_KEY}`
          }}); // Pas de URL aan
            const vakkenRes = await axios.get('http://localhost:3001/vakken', {headers: {
              'x-api-key': `${API_KEY}`
          }}); // Pas de URL aan
            setKlassen(klassenRes.data);
            setVakken(vakkenRes.data);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Prepare the data to send
      const leerlingenData = Object.keys(selectedLeerlingen)
          .filter(leerlingId => selectedLeerlingen[leerlingId]) // Only include selected students
          .map(leerlingId => ({
              leerling_id: leerlingId,
              cijfer: prompt(`Voer cijfer in voor leerling ${leerlingId}:`) // Prompt for grade input
          }));
  
      // Send the data to the backend
      try {
        const response = await axios.post('http://localhost:3001/cijfers', {
          klas_id: klas,
          vak_id: vak,
          leerlingen: leerlingenData
      }, {
          headers: {
              'x-api-key': `${API_KEY}`
          }
      });
          alert(response.data.message); // Show success message
      } catch (error) {
          console.error("Error saving grades:", error);
          alert("Er is een fout opgetreden bij het opslaan van de cijfers.");
      }
  };

    const handleCheckboxChange = (leerlingId) => {
        setSelectedLeerlingen((prev) => ({
            ...prev,
            [leerlingId]: !prev[leerlingId],
        }));
    };

    const handleKlasChange = async (e) => {
      setKlas(e.target.value);
      const leerlingenRes = await axios.get(`http://localhost:3001/leerlingen?klas_id=${e.target.value}`, {
          headers: {
              'x-api-key': `${API_KEY}`
          }
      });
      setLeerlingen(leerlingenRes.data);
  };

    return (
      <>
      <SideNav />
      <div className='absolute top-[17%] w-[80%] left-[12%]'>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="klas">Klas:</label>
                <select id="klas" value={klas} onChange={handleKlasChange}>
                    <option value="">Selecteer een klas</option>
                    {klassen.map((k) => (
                        <option key={k.klas_id} value={k.klas_id}>{k.naam}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="vak">Vak:</label>
                <select id="vak" value={vak} onChange={(e) => setVak(e.target.value)}>
                    <option value="">Selecteer een vak</option>
                    {vakken.map((v) => (
                        <option key={v.vak_id} value={v.vak_id}>{v.naam}</option>
                    ))}
                </select>
            </div>
            <div>
                <h3>Leerlingen:</h3>
                {leerlingen.map((leerling) => (
    <div key={leerling.leerling_id}>
        <label>
            <input
                type="checkbox"
                checked={!!selectedLeerlingen[leerling.leerling_id]}
                onChange={() => handleCheckboxChange(leerling.leerling_id)}
            />
            {leerling.name}
                      </label>
                      {selectedLeerlingen[leerling.leerling_id] && (
                          <form onSubmit={(e) => {
                              e.preventDefault();
                              const cijfer = e.target.cijfer.value;
                          }}>
                              <input type="number" name="cijfer" min="1" max="10" required />
                              <button type="submit">Save Grade</button>
                          </form>
                      )}
                  </div>
              ))}
            </div>
            <button type="submit">Cijfers Invoeren</button>
        </form>
        </div>
        </>
    );
};

export default CijfersInvoer;