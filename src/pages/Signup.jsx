import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const server_url = import.meta.env.VITE_SERVER_URL;

    
  

    const handleSignup = async (e) => {
        e.preventDefault();
        
        try {
            const obj = {
                username: username,
                email: email,
                password: password
            };
            const response = await axios.post(`${server_url}register`, obj, {
                headers: {
                    'Content-Type': 'application/json',
                }

             
            });

            console.log('Signup successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error during signup:', error);
            setError(error.response?.data || 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <main className="container mx-auto p-6">
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300" aria-label="Username">Username</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            name='username'
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300" aria-label="Email">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            name='email'
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300" aria-label="Password">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            name='password'
                        />
                    </div>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded" type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Signup;
