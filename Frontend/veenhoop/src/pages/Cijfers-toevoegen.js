import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNav from './components/side-nav';
import { useAuth } from '../AuthContext';

const CijfersInvoer = () => {
    const [klas, setKlas] = useState('');
    const [vak, setVak] = useState('');
    const [leerlingen, setLeerlingen] = useState([]);
    const [selectedLeerlingen, setSelectedLeerlingen] = useState({});
    const [klassen, setKlassen] = useState([]);
    const [vakken, setVakken] = useState([]);
    const [filteredVakken, setFilteredVakken] = useState([]);
    const [cijfers, setCijfers] = useState({}); // State to hold grades

    const API_KEY = "VeenHoop_APIKEY_G123242JDD224jJnndjh2774hdDJJWeruu338hu32fnfh"; // Your API key

    // Log the logged-in user's ID
    const { user } = useAuth(); // Access logged-in user's data
    const docentId = user?.docent_id; // Retrieve docent_id

    useEffect(() => {
        console.log("Logged-in Docent ID:", docentId);
    }, [docentId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const klassenRes = await axios.get('http://localhost:3001/klassen/all', { headers: { 'x-api-key': `${API_KEY}` } });
                const vakkenRes = await axios.get('http://localhost:3001/vakken', { headers: { 'x-api-key': `${API_KEY}` } });
                
                setKlassen(klassenRes.data);
                setVakken(vakkenRes.data);

                // Filter vakken for the logged-in docent
                const docentVakken = vakkenRes.data.filter((vak) => vak.docent_id === docentId);
                setFilteredVakken(docentVakken);

                // Log fetched data for debugging
                console.log("All Vakken:", vakkenRes.data);
                console.log("Filtered Vakken for Docent:", docentVakken);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [docentId]); // Dependency on logged-in docent ID

    const handleSubmit = async (e) => {
        e.preventDefault();

        const leerlingenData = Object.keys(selectedLeerlingen)
            .filter(leerlingId => selectedLeerlingen[leerlingId]) // Only include selected students
            .map(leerlingId => ({
                leerling_id: leerlingId,
                cijfer: cijfers[leerlingId] // Get the grade from state
            }));

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
            console.log("Submitting data:", {
                klas_id: klas,
                vak_id: vak,
                leerlingen: leerlingenData
            });
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
        try {
            const leerlingenRes = await axios.get(`http://localhost:3001/leerlingen?klas_id=${e.target.value}`, {
                headers: {
                    'x-api-key': `${API_KEY}`
                }
            });
            setLeerlingen(leerlingenRes.data);

            // Log retrieved leerlingen for debugging
            console.log(`Leerlingen for klas ${e.target.value}:`, leerlingenRes.data);
        } catch (error) {
            console.error("Error fetching leerlingen:", error);
        }
    };

    const handleCijferChange = (leerlingId, value) => {
        const numericValue = parseFloat(value);
        if (numericValue >= 1.0 && numericValue <= 10.0) {
            setCijfers((prev) => ({
                ...prev,
                [leerlingId]: numericValue
            }));
        } else {
            alert("Cijfer moet tussen 1.0 en 10.0 zijn.");
        }
    };

    return (
        <>
            <SideNav />
            <div className='absolute flex-1 top-44 w-fit left-56'>
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
                            {filteredVakken.map((v) => (
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
                                    <div>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            required
                                            onChange={(e) => handleCijferChange(leerling.leerling_id, e.target.value)}
                                        />
                                        <button type="button" onClick={() => {
                                            const cijfer = cijfers[leerling.leerling_id];
                                            if (cijfer) {
                                                alert(`Cijfer voor ${leerling.name} is opgeslagen: ${cijfer}`);
                                            }
                                        }}>Opslaan</button>
                                    </div>
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
