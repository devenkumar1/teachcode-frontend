// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the app and provide the auth state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
