// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Quiz from '../componets/Quiz';
import UserChoice from '../componets/UserChoice';

const Dashboard = () => {
  return (
    <main className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/learning-path" className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl">
          Learning Path
        </Link>
        <Link to="/mentor-appointment" className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl">
          Mentor Appointment
        </Link>
        <Link to="/code-editor" className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl">
          Code Editor
        </Link>
        
      </div>
    </main>
  );
};

export default Dashboard;
