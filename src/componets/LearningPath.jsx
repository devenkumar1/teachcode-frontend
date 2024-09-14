import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const LearningPath = () => {
  const location = useLocation();
  const { language, skillLevel } = location.state || {};
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Validate that language and skillLevel are not empty
    if (language && skillLevel) {
      const sendLearningPathData = async () => {
        try {
          const response = await axios.post('http://192.168.255.10:4500/learningPath', {
            skill: language,
            skillLevel,
          });
          console.log('Learning Path Data Sent Successfully:', response.data);
          setData(response.data.learningPath);
          setError(null);
        } catch (error) {
          console.error('Error sending learning path data:', error);
          setError('Error fetching learning path data.');
        }
      };

      sendLearningPathData();
    } else {
      setError('Language or skill level is missing');
    }
  }, [language, skillLevel]);

  // Function to format the learning path response
  const formatLearningPath = (text) => {
    if (!text) return <p>No learning path available.</p>;
    return text.split('\n').map((line, index) => (
      <p key={index} className="mb-4">
        {line}
      </p>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Learning Path</h1>
      {language && skillLevel ? (
        <p className="text-lg mb-4">
          You are learning <strong>{language}</strong> at a <strong>{skillLevel}</strong> level.
        </p>
      ) : (
        <p className="text-lg mb-4">No learning path details available.</p>
      )}
      <div className="w-full max-w-4xl">
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : data ? (
          formatLearningPath(data)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default LearningPath;
