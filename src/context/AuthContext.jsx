// src/context/AuthContext.jsx
import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';


// Create the context
const AppContext = createContext();
const backend_url=import.meta.env.VITE_SERVER_URL;

// Create a custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// AppProvider component to wrap around your app
export const AppProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    
    const login = (data) => {
        setUser(data);
    };
    
    const logout = async() => {
    const loggedOut= await axios.get(`${backend_url}/api/logout`,"null",{withCredentials:true});
    if(loggedOut.status===200){
      console.log("logout succesfull");
      setUser(null);
    }
  };

  return (
    <AppContext.Provider value={{ user, login, logout,setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;