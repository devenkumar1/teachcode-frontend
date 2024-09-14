// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LearningPath from './componets/LearningPath';
import MentorAppointment from './pages/MentorAppointment';
import CodeEditor from './pages/CodeEditor';
import Navbar from './componets/Navbar';
import Signup from './pages/Signup';
import Quiz from './componets/Quiz';
import UserChoice from './componets/UserChoice';
import Result from './componets/Result';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/mentor-appointment" element={<MentorAppointment />} />
            <Route path="/code-editor" element={<CodeEditor />} />
            <Route path="/user-choice" element={<UserChoice />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
