import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';
const UserChoice = () => {
    const [language, setLanguage] = useState('');
    const [skillLevel, setSkillLevel] = useState('');
    const {user} = useAppContext(); 
      const navigate=useNavigate();
      if(!user){
       return(
        <div className='flex items-center justify-center w-full min-h-screen'>please login first:  <a href="/login"><button className='p-2 bg-blue-500 rounded-md '>Login</button></a> </div>
       )
      }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (skillLevel === 'none') {
            // Navigate to Learning Path page and pass state
            navigate('/learning-path', { state: { language, skillLevel } });
        } else {
            // Navigate to Quiz page and pass state
            navigate('/quiz', { state: { language, skillLevel } });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[50vh] bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Select your Language and Skill Level
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Language Selection */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                            Programming Language
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-200"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            required
                        />
                    </div>

                    {/* Skill Level Selection */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                            Skill Level
                        </label>
                        <select
                            className="block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-200"
                            value={skillLevel}
                            onChange={(e) => setSkillLevel(e.target.value)}
                            required
                        >
                            <option value="">Select your skill level</option>
                            <option value="none">None</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white transition-all bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserChoice;
