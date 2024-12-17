import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
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
                const leerlingId = user?.leerling_id;
                if (!leerlingId) {
                    console.error('leerling_id is not available.');
                    setLoading(false);
                    return;
                }

                const gradesRes = await axios.get(
                    `http://localhost:3001/cijfers?leerling_id=${leerlingId}`,
                    { headers: { 'x-api-key': API_KEY } }
                );
                setGrades(gradesRes.data);

                const docentenRes = await axios.get('http://localhost:3001/docenten', {
                    headers: { 'x-api-key': API_KEY },
                });
                const docentenMap = {};
                docentenRes.data.forEach((docent) => {
                    docentenMap[docent.docent_id] = docent.name;
                });
                setDocenten(docentenMap);

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

    const downloadPDF = () => {
        const element = document.getElementById('gradesTable');
        const options = {
            margin: 1,
            filename: `Grades_${user?.leerling_id}.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(options).from(element).save();
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <SideNav />
            <div className="absolute flex-1 top-44 w-fit left-56">
                <h1 className="text-2xl font-bold">My Grades</h1>
                {grades.length > 0 ? (
                    <>
                        <table
                            id="gradesTable"
                            className="w-full border border-collapse border-gray-300 table-auto"
                        >
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
                        <button
                            onClick={downloadPDF}
                            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
                        >
                            Download as PDF
                        </button>
                    </>
                ) : (
                    <p>No grades found for this student.</p>
                )}
            </div>
        </>
    );
};

export default GradesOverview;
