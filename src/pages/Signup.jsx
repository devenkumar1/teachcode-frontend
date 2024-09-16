// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const server_url = import.meta.env.VITE_SERVER_URL;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const obj = {
        username,
        email,
        password,
      };

      const response = await axios.post(`${server_url}/register`, obj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Signup successful:', response.data);
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      setError(
        error.response?.data?.message ||
          'An unexpected error occurred. Please try again.'
      );
    }
  };

  return (
    <main className="container p-6 mx-auto">
      <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="mb-6 text-3xl font-bold text-center">Sign Up</h2>
        {error && <p className="mb-4 text-center text-red-600">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-black dark:text-gray-500">
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 text-black border border-gray-300 rounded dark:border-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              name="username"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-black dark:text-gray-500">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 text-black border border-gray-300 rounded dark:border-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              name="email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-black dark:text-gray-500">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 text-black border border-gray-300 rounded dark:border-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
            />
          </div>
          <button
            className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <button
          className="w-full p-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700"
          onClick={() => navigate('/login')}
        >
          Already have an account? Login
        </button>
      </div>
    </main>
  );
};

export default Signup;
