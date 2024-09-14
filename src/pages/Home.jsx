// src/pages/Home.jsx
import React from 'react';
import FeatureCard from '../componets/FeatureCard';
import CallToAction from '../componets/CallToAction';
import UserChoice from '../componets/UserChoice';

const Home = () => {
  return (
    <main className="container mx-auto p-6">
      {/* Reduced vertical margin for the heading section */}
      <div className='pb-2'><CallToAction /></div>
      <section className="text-center my-4">
        <h2 className="text-4xl font-bold mb-2">Welcome to Your Learning Journey</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Tailored learning paths, AI-driven feedback, and mentorship to guide your programming journey.
        </p>
      </section>
      
      {/* Reduced gap between grid items */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
        <FeatureCard title="Personalized Learning" description="Get a tailored path based on your skill level." icon="🧠" />
        <FeatureCard title="AI Feedback" description="Receive detailed AI-driven feedback." icon="🤖" />
        <FeatureCard title="Mentorship" description="Book appointments with mentors." icon="👨‍🏫" />
      </div>
      
      {/* Centering the UserChoice component with reduced margin */}
      <div className="flex justify-center items-center mb-1 ">
        <UserChoice />
        
        
      </div>
      
    </main>
  );
};

export default Home;
