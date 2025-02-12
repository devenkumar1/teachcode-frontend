import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quizId, setQuizId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { language, skillLevel } = location.state || {}; 
  const backend_url= import.meta.REACT_APP_BACKEND_URL;

  console.log(language, skillLevel);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Send language and skillLevel to the backend if needed
        const response = await axios.post(`${backend_url}/api/quiz`, { language, skillLevel }, { withCredentials: true });
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setQuestions(response.data.data);
          setSelectedOptions(new Array(response.data.data.length).fill(null));
          setQuizId(response.data.quizId);
        } else {
          setError('Unexpected response format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching quiz data:', err);
        setError('Failed to load quiz questions');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [language, skillLevel]); // Add dependencies

  const handleOptionChange = (questionIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        quizId: quizId,
        answers: selectedOptions.filter(option => option !== null),
      };

      const response = await axios.post('http://192.168.255.10:4500/matchanswer', payload);

      if (response.data && response.data.success) {
        navigate('/result', { state: { score: response.data.score } }); // Redirect to Result component with score
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('There was an error submitting the quiz.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-gray-100">Quiz</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {questions.map((questionObj, index) => (
            <div key={index} className="mb-8">
              <p className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                {index + 1}. {questionObj.question}
              </p>
              <div className="flex flex-col space-y-2">
                {questionObj.options.map((option, optIndex) => (
                  <label key={optIndex} className="inline-flex items-center p-2 transition bg-gray-100 rounded-md dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      className="mr-2 text-blue-500 form-radio"
                      onChange={() => handleOptionChange(index, option)}
                      checked={selectedOptions[index] === option}
                    />
                    <span className="text-gray-600 dark:text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 mt-6 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
              disabled={selectedOptions.includes(null)}
            >
              Submit Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
