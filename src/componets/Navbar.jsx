// src/componets/Navbar.jsx
import React from 'react';
import { useAppContext } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAppContext(); 
  const navigate=useNavigate();

  return (
    <nav className="p-4 text-white bg-blue-500">
      <div className="flex items-center justify-between">
        <span className="font-bold"><a href="/">My App</a></span>
        {user ? (
          <button onClick={logout} className="px-4 py-2 bg-red-500 rounded">
            Logout
          </button>
        ) : (
          <button className="px-4 py-2 bg-green-500 rounded" onClick={()=>navigate('/login')}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
