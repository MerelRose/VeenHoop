import React, { useState, useEffect } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import SideNav from './components/side-nav';

function GradesPage() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "VeenHoop_APIKEY_G123242JDD224jJnndjh2774hdDJJWeruu338hu32fnfh";

  useEffect(() => {
    axios.get("http://localhost:3001/klassen", {
        headers: { 'x-api-key': `${API_KEY}` }
      })
      .then((response) => setClasses(response.data))
      .catch((error) => console.error("Error fetching classes:", error));
  }, []);

  useEffect(() => {
    if (selectedClass) {
      setLoading(true);

      const fetchStudents = axios.get(`http://localhost:3001/leerlingen`, {
        params: { klas_id: selectedClass },
        headers: { 'x-api-key': `${API_KEY}` }
      });

      const fetchLessons = axios.get(`http://localhost:3001/vakken`, {
        params: { klas_id: selectedClass },
        headers: { 'x-api-key': `${API_KEY}` }
      });

      Promise.all([fetchStudents, fetchLessons])
        .then(async ([studentsRes, lessonsRes]) => {
          setStudents(studentsRes.data);
          setLessons(lessonsRes.data);

          const gradesPromises = studentsRes.data.map(student =>
            axios.get(`http://localhost:3001/cijfers`, {
              params: { klas_id: selectedClass, leerling_id: student.leerling_id },
              headers: { 'x-api-key': `${API_KEY}` }
            })
          );

          const gradesResponses = await Promise.all(gradesPromises);
          const allGrades = gradesResponses.flatMap(res => res.data);
          setGrades(allGrades);
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setLoading(false));
    }
  }, [selectedClass]);

  const downloadPDF = () => {
    const element = document.getElementById("gradesTable");
    const options = {
      margin: 1,
      filename: `Grades_${selectedClass}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <>
      <SideNav />
      <div className="absolute flex-1 top-44 w-fit left-56">
        <h1>Grades Overview</h1>
        <label htmlFor="classDropdown">Select Class:</label>
        <select
          id="classDropdown"
          value={selectedClass || ""}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="" disabled>
            Choose a class
          </option>
          {classes.map((klas) => (
            <option key={klas.klas_id} value={klas.klas_id}>
              {klas.naam}
            </option>
          ))}
        </select>

        {loading && <p>Loading...</p>}

        {selectedClass && !loading && (
          <>
            <table id="gradesTable">
              <thead>
                <tr>
                  <th>Student Name</th>
                  {lessons.map((lesson) => (
                    <th key={lesson.vak_id}>{lesson.naam}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.leerling_id}>
                    <td>{student.name}</td>
                    {lessons.map((lesson) => {
                      const grade = grades.find(
                        (g) =>
                          g.leerling_id === student.leerling_id &&
                          g.vak_id === lesson.vak_id
                      );
                      return <td key={lesson.vak_id}>{grade ? grade.cijfer : "-"}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={downloadPDF}>Download as PDF</button>
          </>
        )}
      </div>
    </>
  );
}

export default GradesPage;
