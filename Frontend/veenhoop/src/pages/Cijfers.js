import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import SideNav from './components/side-nav';

const GradesOverview = () => {
    const [grades, setGrades] = useState([]);
    const [docenten, setDocenten] = useState({});
    const [vakken, setVakken] = useState({});
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const API_KEY = 'VeenHoop_APIKEY_G123242JDD224jJnndjh2774hdDJJWeruu338hu32fnfh';

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                // Check if leerling_id is available
                const leerlingId = user?.leerling_id;
                if (!leerlingId) {
                    console.error('leerling_id is not available.');
                    setLoading(false);
                    return;
                }

                // Fetch grades for the logged-in leerling_id
                const gradesRes = await axios.get(
                    `http://localhost:3001/cijfers?leerling_id=${leerlingId}`,
                    { headers: { 'x-api-key': API_KEY } }
                );
                setGrades(gradesRes.data);

                // Fetch docenten
                const docentenRes = await axios.get('http://localhost:3001/docenten', {
                    headers: { 'x-api-key': API_KEY },
                });
                const docentenMap = {};
                docentenRes.data.forEach((docent) => {
                    docentenMap[docent.docent_id] = docent.name;
                });
                setDocenten(docentenMap);

                // Fetch vakken
                const vakkenRes = await axios.get('http://localhost:3001/vakken', {
                    headers: { 'x-api-key': API_KEY },
                });
                const vakkenMap = {};
                vakkenRes.data.forEach((vak) => {
                    vakkenMap[vak.vak_id] = vak.naam;
                });
                setVakken(vakkenMap);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching grades or metadata:', error);
                setLoading(false);
            }
        };

        fetchGrades();
    }, [user?.leerling_id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <SideNav />
            <div className="absolute top-[17%] w-[80%] left-[12%]">
                <h1 className="text-2xl font-bold">My Grades</h1>
                {grades.length > 0 ? (
                    <table className="w-full border border-collapse border-gray-300 table-auto">
                        <thead>
                            <tr>
                                <th className="p-2 border border-gray-300">Vak</th>
                                <th className="p-2 border border-gray-300">Blok</th>
                                <th className="p-2 border border-gray-300">Cijfer</th>
                                <th className="p-2 border border-gray-300">Docent</th>
                                <th className="p-2 border border-gray-300">Ingevoerd op</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((grade) => (
                                <tr key={grade.cijfer_id}>
                                    <td className="p-2 border border-gray-300">{vakken[grade.vak_id] || 'N/A'}</td>
                                    <td className="p-2 border border-gray-300">{grade.blok_id}</td>
                                    <td className="p-2 border border-gray-300">{grade.cijfer}</td>
                                    <td className="p-2 border border-gray-300">{docenten[grade.docent_id] || 'N/A'}</td>
                                    <td className="p-2 border border-gray-300">{new Date(grade.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No grades found for this student.</p>
                )}
            </div>
        </>
    );
};

export default GradesOverview;
