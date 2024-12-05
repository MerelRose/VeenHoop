import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNav from './components/side-nav';

function GradesPage() {
  const [classes, setClasses] = useState([]); // State to hold classes
  const [selectedClass, setSelectedClass] = useState(null); // State for selected class
  const [students, setStudents] = useState([]); // State to hold students
  const [lessons, setLessons] = useState([]); // State to hold lessons
  const [grades, setGrades] = useState([]); // State to hold grades
  const [loading, setLoading] = useState(false); // Loading state

  const API_KEY = "VeenHoop_APIKEY_G123242JDD224jJnndjh2774hdDJJWeruu338hu32fnfh"; // Your API key

  // Fetch classes on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3001/klassen", {
        headers: {
          'x-api-key': `${API_KEY}` 
        }
      })
      .then((response) => setClasses(response.data)) // Set classes from response
      .catch((error) => console.error("Error fetching classes:", error));
  }, []);

  // Fetch students, lessons, and grades when a class is selected
  useEffect(() => {
    if (selectedClass) {
      setLoading(true);

      // Fetch students in the selected class
      const fetchStudents = axios.get(`http://localhost:3001/leerlingen`, {
        params: { klas_id: selectedClass }, // Filter by selected class
        headers: {
          'x-api-key': `${API_KEY}`
        }
      });

      // Fetch lessons for the selected class
      const fetchLessons = axios.get(`http://localhost:3001/vakken`, {
        params: { klas_id: selectedClass }, // Filter by selected class
        headers: {
          'x-api-key': `${API_KEY}`
        }
      });

      // Fetch grades for students in the selected class
      const fetchGrades = axios.get(`http://localhost:3001/cijfers`, {
        params: { klas_id: selectedClass }, // Filter grades by selected class
        headers: {
          'x-api-key': `${API_KEY}`
        }
      });

      Promise.all([fetchStudents, fetchLessons, fetchGrades])
        .then(([studentsRes, lessonsRes, gradesRes]) => {
          setStudents(studentsRes.data); // Set students from response
          setLessons(lessonsRes.data); // Set lessons from response
          setGrades(gradesRes.data); // Set grades from response
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setLoading(false));
    }
  }, [selectedClass]);

  return (
    <>
      <SideNav />
      <div className="absolute top-[17%] w-[80%] left-[12%]">
        <h1>Grades Overview</h1>
        {/* Dropdown to select a class */}
        <label htmlFor="classDropdown">Select Class:</label>
        <select
          id="classDropdown"
          value={selectedClass || ""}
          onChange={(e) => setSelectedClass(e.target.value)} // Update selected class
        >
          <option value="" disabled>
            Choose a class
          </option>
          {classes.map((klas) => (
            <option key={klas.klas_id} value={klas.klas_id}>
              {klas.naam} {/* Display class name */}
            </option>
          ))}
        </select>

        {loading && <p>Loading...</p>} {/* Loading indicator */}

        {/* Table displaying students, lessons, and grades */}
        {selectedClass && !loading && (
          <table >
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
                  <td>{student.name}</td> {/* Display student name */}
                  {lessons.map((lesson) => {
                    // Find the grade for this student and lesson
                    const grade = grades.find(
                      (g) =>
                        g.leerling_id === student.leerling_id &&
                        g.vak_id === lesson.vak_id
                    );
                    return <td key={lesson.vak_id}>{ grade ? grade.cijfer : "-"}</td>; // Display grade or dash
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default GradesPage;