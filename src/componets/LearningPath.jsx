import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';
const backend_url=import.meta.env.VITE_SERVER_URL;

const LearningPath = () => {
  const location = useLocation();
  const { language, skillLevel } = location.state || {language:'js',skillLevel:'beg'};
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  
  //if not logged in return
  const {user} = useAppContext(); 
    if(!user){
     return(
      <div className='flex items-center justify-center w-full min-h-screen'>please login first:  <a href="/login"><button className='p-2 bg-blue-500 rounded-md '>Login</button></a> </div>
     )
    }

  useEffect(() => {
    // Validate that language and skillLevel are not empty
    if (language && skillLevel) {
      const sendLearningPathData = async () => {
        try {
          const response = await axios.post(`${backend_url}/api/learningPath`, {
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
      <h1 className="mb-6 text-3xl font-bold">Welcome to Your Learning Path</h1>
      {language && skillLevel ? (
        <p className="mb-4 text-lg">
          You are learning <strong>{language}</strong> at a <strong>{skillLevel}</strong> level.
        </p>
      ) : (
        <p className="mb-4 text-lg">No learning path details available.</p>
      )}
      <div className="w-full max-w-4xl">
        {error ? (
          ""
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
