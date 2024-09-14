// src/components/CallToAction.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="mt-10 text-center">
      <Link to="/login" className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700">
        Get Started with Your Personalized Learning Path
      </Link>
    </div>
  );
};

export default CallToAction;
