import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import background from '../images/veenhoop.jpg';
import '../styles/App.css';
import { useAuth } from '../AuthContext';

function Home() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [apiEndpoint, setApiEndpoint] = useState('http://localhost:3001/loginstudent'); // Default to student login
    const navigate = useNavigate();

    const API_KEY = 'VeenHoop_APIKEY_G123242JDD224jJnndjh2774hdDJJWeruu338hu32fnfh';

    // Check if the user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home'); // Redirect to /home if already logged in
        }
    }, [navigate]);

    const handleLogin = async () => {
      try {
          const response = await axios.post(apiEndpoint, 
              { email, password },
              { headers: { 'x-api-key': `${API_KEY}` } }
          );
  
          const userData = {
              token: response.data.token,
              role: response.data.role,
              docent_id: response.data.docent_id || null, // Map 'id' to 'docent_id'
              name: response.data.name
          };
  
          // Log the user's info to the console
          console.log("Logged-in user info:", userData);
  
          setSuccessMessage(`Welcome, ${response.data.name}`);
          setErrorMessage('');
  
          login(userData); // Pass user data to context
          navigate('/home');
      } catch (error) {
          setErrorMessage(error.response?.data?.message || 'Login failed');
          setSuccessMessage('');
          console.error(error);
      }
  };
  

    return (
        <>
            <img src={background} className="absolute w-[70%] h-auto left-[15%]" alt="bg" />
            <div className="absolute left-[40%] top-[30%] bg-white p-5 h-[55%] rounded-lg">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}>
                    <label htmlFor="email" className="text-lg font-Rubik"> School e-mail: </label> <br />
                    <input 
                        type="text" 
                        id="email" 
                        name="email" 
                        placeholder="School e-mail" 
                        className="p-2 rounded-lg w-96 border-inherit bg-gradient-to-r from-stone-300 to-stone-200" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    /> <br />
                    <cite className="text-gray-300">School e-mail</cite> <br />
                    <label htmlFor="password" className="text-lg font-Rubik"> Wachtwoord: </label> <br />
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Wachtwoord" 
                        className="p-2 rounded-lg w-96 border-inherit bg-gradient-to-r from-stone-300 to-stone-200" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    /> <br />
                    <cite className="text-gray-300">Wachtwoord</cite> <br />
                    {/* Optional buttons for student or teacher login */}
                    <div className="mb-4">
                        <button 
                            type="button" 
                            className={`w-[185px] text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 ${apiEndpoint === 'http://localhost:3001/loginstudent' && 'bg-blue-800 text-white'}`} 
                            onClick={() => setApiEndpoint('http://localhost:3001/loginstudent')}
                        >
                            Student
                        </button>
                        <button 
                            type="button" 
                            className={`w-[185px] text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ${apiEndpoint === 'http://localhost:3001/logindocent' && 'bg-blue-800 text-white'}`} 
                            onClick={() => setApiEndpoint('http://localhost:3001/logindocent')}
                        >
                            Leraar
                        </button>
                    </div>
                    <button 
                        type="submit" 
                        className="bottom-5 absolute w-[185px] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                    >
                        Login
                    </button>
                </form>
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                {successMessage && <div className="text-green-500">{successMessage}</div>}
            </div>
        </>
    );
}

export default Home;
