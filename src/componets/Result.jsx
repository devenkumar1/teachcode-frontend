import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';
const Result = () => {
  const location = useLocation();
  const {user} = useAppContext(); 
    if(!user){
     return(
      <div className='flex items-center justify-center w-full min-h-screen'>please login first:  <a href="/login"><button className='p-2 bg-blue-500 rounded-md '>Login</button></a> </div>
     )
    }
  
  // Extract state from location
  const { score = 'N/A', results = [], skillLearning = 'N/A', language = 'N/A' } = location.state || {};
  
  // Check if results is an array and handle if it's not
  const isValidResults = Array.isArray(results);

  // Handler for button click
  const handleScheduleLearning = () => {
    navigate('/learning-path', {
      state: { skillLearning, language }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h3 className="mb-6 text-3xl font-bold text-gray-800 dark:text-gray-100">Quiz Result</h3>
        <div className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-300">
          <p>Your score is:</p>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{score}</p>
        </div>

        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">Detailed Results:</h2>
        <div className="space-y-4">
          {isValidResults && results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="p-4 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{index + 1}. {result.question}</p>
                <ul className="pl-6 text-gray-700 list-disc dark:text-gray-300">
                  <li><strong>Given Answer:</strong> {result.givenAnswer}</li>
                  <li><strong>Correct Answer:</strong> {result.correctAnswer}</li>
                  <li><strong>Status:</strong> {result.correct ? 'Correct' : 'Incorrect'}</li>
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No results available.</p>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Summary:</h2>
          <p className="text-gray-700 dark:text-gray-300">Overall Score: {score}</p>
          <p className="text-gray-700 dark:text-gray-300">Correct Answers: {isValidResults ? results.filter(r => r.correct).length : 0}</p>
          <p className="text-gray-700 dark:text-gray-300">Incorrect Answers: {isValidResults ? results.filter(r => !r.correct).length : 0}</p>
          <p className="text-gray-700 dark:text-gray-300">Unverifiable Answers: {isValidResults ? results.filter(r => r.unverifiable).length : 0}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Skill Assessment:</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Based on the provided answers and questions, review the areas where improvement is needed and the understanding demonstrated.
          </p>
        </div>

        <button 
          onClick={handleScheduleLearning} 
          className="p-3 mt-8 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
        >
          Schedule My Learning
        </button>
      </div>
    </div>
  );
};

export default Result;
