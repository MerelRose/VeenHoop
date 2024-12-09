// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // Store user data (e.g., docent_id, role)

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData); // Set logged-in user data
        localStorage.setItem('token', userData.token); // Save token
        localStorage.setItem('role', userData.role); // Save role
        localStorage.setItem('docent_id', userData.docent_id); // Save docent_id (if applicable)
        localStorage.setItem('leerling_id', userData.leerling_id); // Save leerling_id (if applicable)
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null); // Clear user data
        localStorage.removeItem('token'); // Clear token on logout
        localStorage.removeItem('role'); // Clear role on logout
        localStorage.removeItem('docent_id'); // Clear docent_id on logout
        localStorage.removeItem('leerling_id'); // Clear leerling_id on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
