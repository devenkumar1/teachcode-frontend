// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logojpg from '../assets/teachcode.png';

const Navbar = () => {
    const { user, logout } = useAuth();  // Get user and logout method from context

    return (
        <nav className="bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="w-32"><img src={logojpg} alt="" /></Link>
                <div className="space-x-4">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => (isActive ? 'underline' : 'hover:underline')}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/learning-path"
                        className={({ isActive }) => (isActive ? 'underline' : 'hover:underline')}
                    >
                        Learning Path
                    </NavLink>
                    <NavLink
                        to="/mentor-appointment"
                        className={({ isActive }) => (isActive ? 'underline' : 'hover:underline')}
                    >
                        Mentor
                    </NavLink>
                    <NavLink
                        to="/code-editor"
                        className={({ isActive }) => (isActive ? 'underline' : 'hover:underline')}
                    >
                        Code Editor
                    </NavLink>
                    {user ? (
                        <>
                            <span>Welcome, {user.name}</span>
                            <button className="bg-red-500 hover:bg-red-700 p-2 rounded" onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 p-2 rounded">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
