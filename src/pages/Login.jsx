// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../context/AuthContext'; // Ensure this is imported

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAppContext();  // Make sure `login` is coming from context

  const server_url = import.meta.env.VITE_SERVER_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const obj = { email: username, password: password };
      const response = await axios.post(`${server_url}/api/login`, obj, { withCredentials: true });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        login(response.data); 
        navigate('/'); 
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(error?.response?.data?.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <main className="container p-6 mx-auto">
      <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="mb-6 text-3xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-black dark:text-gray-500">Username</label>
            <input
              type="text"
              className="w-full p-2 text-black border border-gray-300 rounded dark:border-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-black dark:text-gray-300">Password</label>
            <input
              type="password"
              className="w-full p-2 text-black border border-gray-300 rounded dark:border-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700" type="submit">
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-red-600">{error}</p>}
        <button className="w-full p-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
    </main>
  );
};

export default Login;
