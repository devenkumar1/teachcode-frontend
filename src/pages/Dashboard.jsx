// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Quiz from '../componets/Quiz';
import UserChoice from '../componets/UserChoice';
import { useAppContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
 const {user} = useAppContext(); 
  const navigate=useNavigate();
  if(!user){
   return(
    <div className='flex items-center justify-center w-full min-h-screen'>please login first:  <a href="/login"><button className='p-2 bg-blue-500 rounded-md '>Login</button></a> </div>
   )
  }
  
  return (
    <main className="container p-6 mx-auto">
      <h2 className="mb-6 text-3xl font-bold">Dashboard</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/learning-path" className="p-6 text-white bg-blue-500 rounded-lg shadow-lg hover:shadow-2xl">
          Learning Path
        </Link>
        <Link to="/mentor-appointment" className="p-6 text-white bg-blue-500 rounded-lg shadow-lg hover:shadow-2xl">
          Mentor Appointment
        </Link>
        <Link to="/code-editor" className="p-6 text-white bg-blue-500 rounded-lg shadow-lg hover:shadow-2xl">
          Code Editor
        </Link>
        
      </div>
    </main>
  );
};

export default Dashboard;

