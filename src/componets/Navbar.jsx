import React, { useEffect } from 'react';
import { useAppContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const backend_url = import.meta.env.VITE_SERVER_URL;
  const { user, logout, setUser } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch the user if not already set
    if (user===null) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${backend_url}/api/me`, {
            withCredentials: true, 
          });
          if (response.data && response.data.user) {
            console.log(response.data);
            setUser(response.data.user);
          }
        } catch (error) {
          console.log("Error fetching user", error);
        }
      };
      fetchUser();
    }
  }, [user, setUser, backend_url]);

  return (
    <nav className="p-4 text-white bg-blue-500">
      <div className="flex items-center justify-between">
        <span className="font-bold">
          <a href="/">My App</a>
        </span>
        {user ? (
          <button onClick={logout} className="px-4 py-2 bg-red-500 rounded">
            Logout
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 rounded"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
