import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNav from './components/side-nav';

function StudentsAndClassesPage() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentPassword, setNewStudentPassword] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAllStudents, setShowAllStudents] = useState(false);
  const API_KEY = "VeenHoop_APIKEY_G123242JDD224jJnndjh2774hdDJJWeruu338hu32fnfh";

  useEffect(() => {
    fetchClasses();
    fetchAllStudents();
  }, []);

  const fetchClasses = () => {
    axios.get("http://localhost:3001/klassen/all", {
      headers: { 'x-api-key': API_KEY }
    })
      .then((response) => setClasses(response.data))
      .catch((error) => console.error("Error fetching classes:", error));
  };

  const fetchStudents = (classId) => {
    axios.get(`http://localhost:3001/leerlingen/all`, {
      params: { klas_id: classId },
      headers: { 'x-api-key': API_KEY }
    })
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  };

  const fetchAllStudents = () => {
    axios.get("http://localhost:3001/leerlingen/all", {
      headers: { 'x-api-key': API_KEY }
    })
      .then((response) => {
        console.log(response.data); // Controleer de structuur van de data
        setStudents(response.data);
      })
      .catch((error) => console.error("Error fetching all students:", error));
  };

  const addClass = () => {
    if (!newClassName) return;

    axios.post("http://localhost:3001/klassen", { naam: newClassName }, {
      headers: { 'x-api-key': API_KEY }
    })
      .then(() => {
        setNewClassName("");
        fetchClasses();
      })
      .catch((error) => console.error("Error adding class:", error));
  };

  const deleteClass = (classId) => {
    axios.delete(`http://localhost:3001/klassen/${classId}`, {
      headers: { 'x-api-key': API_KEY }
    })
      .then(() => fetchClasses())
      .catch((error) => console.error("Error deleting class:", error));
  };

  const addStudent = () => {
    if (!newStudentName || !newStudentEmail || !newStudentPassword || !selectedClass) return;
  
    axios.post("http://localhost:3001/leerlingen", {
      naam: newStudentName,
      email: newStudentEmail,
      wachtwoord: newStudentPassword,
      klas_id: selectedClass
    }, {
      headers: { 'x-api-key': API_KEY }
    })
      .then(() => {
        setNewStudentName("");
        setNewStudentEmail("");
        setNewStudentPassword("");
        fetchStudents(selectedClass);
      })
      .catch((error) => console.error("Error adding student:", error));
  };
  

  const deleteStudent = (studentId) => {
    axios.delete(`http://localhost:3001/leerlingen/${studentId}`, {
      headers: { 'x-api-key': API_KEY }
    })
      .then(() => fetchStudents(selectedClass))
      .catch((error) => console.error("Error deleting student:", error));
  };

  return (
    <>
      <SideNav />
      <div className="absolute flex-1 top-44 w-fit left-56">
        <h1>Manage Classes and Students</h1>

        <div>
          <h2>Classes</h2>
          <input
            type="text"
            placeholder="New class name"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
          />
          <button onClick={addClass}>Add Class</button>

          <ul>
            {classes.map((klas) => (
              <li key={klas.klas_id}>
                {klas.naam}
                <button onClick={() => {
                  setSelectedClass(klas.klas_id);
                  fetchStudents(klas.klas_id);
                }}>View Students</button>
                <button onClick={() => deleteClass(klas.klas_id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {selectedClass && (
          <div>
            <h2>Students in Class</h2>
            <div>
              <input
                type="text"
                placeholder="New student name"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
              />
              <input
                type="email"
                placeholder="New student email"
                value={newStudentEmail}
                onChange={(e) => setNewStudentEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="New student password"
                value={newStudentPassword}
                onChange={(e) => setNewStudentPassword(e.target.value)}
              />
              <button onClick={addStudent}>Add Student</button>
            </div>
            <ul>
              {students.filter(student => student.klas_id === selectedClass).map((student) => (
                <li key={student.leerling_id}>
                  {student.name}
                  <button onClick={() => deleteStudent(student.leerling_id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <button onClick={() => setShowAllStudents(!showAllStudents)}>
            {showAllStudents ? "Hide All Students" : "Show All Students"}
          </button>

          {showAllStudents && (
            <div>
              <h2>All Students</h2>
              <table>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.leerling_id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{classes.find(klas => klas.klas_id === student.klas_id)?.naam || "Unknown"}</td>
                      <td>
                        <button onClick={() => deleteStudent(student.leerling_id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default StudentsAndClassesPage;
