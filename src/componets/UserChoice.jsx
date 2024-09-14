import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserChoice = () => {
    const [language, setLanguage] = useState('');
    const [skillLevel, setSkillLevel] = useState('');
    const navigate = useNavigate();

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
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                    Select your Language and Skill Level
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Language Selection */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Programming Language
                        </label>
                        <input
                            type="text"
                            className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 dark:bg-gray-700 dark:text-gray-200"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            required
                        />
                    </div>

                    {/* Skill Level Selection */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Skill Level
                        </label>
                        <select
                            className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 dark:bg-gray-700 dark:text-gray-200"
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
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-all"
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
