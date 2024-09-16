import React, { useState } from 'react';
import axios from 'axios';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [correctedCode, setCorrectedCode] = useState('');
  const [errors, setErrors] = useState('');
  const [language, setLanguage] = useState('javascript'); // Default to JavaScript
  const backendUrl = 'http://192.168.255.10:4500/code'; 

  // Function to handle running the code
  const handleRunCode = async () => {
    try {
      const response = await axios.post(`${backendUrl}`, {
        code,
        language // Send the selected language to the backend
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const serverResponse = response.data.code;

      // Split the server response into corrected code and errors
      const codeStartIndex = serverResponse.indexOf('```');
      const codeEndIndex = serverResponse.indexOf('```', codeStartIndex + 3);
      const correctedCode = serverResponse.slice(codeStartIndex + 3, codeEndIndex).trim(); // Extract code
      const errors = serverResponse.slice(codeEndIndex + 3).trim(); // Extract errors/corrections

      setCorrectedCode(correctedCode);
      setErrors(errors);
      console.log('Code executed successfully:', serverResponse);
      alert('Code executed successfully.');
    } catch (error) {
      console.error('Error executing code:', error);
      alert('An error occurred while running the code. Please try again.');
    }
  };

  // Function to clear the code
  const handleClearCode = () => {
    setCode('');
    setCorrectedCode('');
    setErrors('');
  };

  return (
    <main className="container p-6 mx-auto">
      <h2 className="mb-6 text-3xl font-bold">Code Doubt and Solutions</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Write, test, and debug your code here:
      </p>

      {/* Language selection dropdown */}
      <div className="mb-4">
        <label htmlFor="language" className="block mb-2 text-lg font-semibold">Choose Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-2 text-white bg-blue-500 border border-gray-300 rounded-md"
          style={{ appearance: 'none' }} // For cross-browser compatibility
        >
          <option value="javascript" className="text-black bg-white">JavaScript</option>
          <option value="python" className="text-black bg-white">Python</option>
          <option value="cpp" className="text-black bg-white">C++</option>
          <option value="java" className="text-black bg-white">Java</option>
          <option value="ruby" className="text-black bg-white">Ruby</option>
          <option value="php" className="text-black bg-white">PHP</option>
          <option value="go" className="text-black bg-white">Go</option>
        </select>
      </div>

      <div className="relative p-4 mt-6 text-white bg-gray-900 rounded-lg">
        {/* Buttons */}
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <button
            className="px-3 py-1 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleRunCode}
          >
            Run
          </button>
          <button
            className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-700"
            onClick={handleClearCode}
          >
            Clear
          </button>
        </div>

        {/* Code Input */}
        <textarea
          className="w-full h-64 p-4 mt-8 text-white bg-gray-800"
          placeholder="Start coding..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
      </div>

      {/* Display Corrected Code */}
      {correctedCode && (
        <div className="p-4 mt-6 bg-green-100 rounded-lg">
          <h3 className="mb-2 text-xl font-bold text-green-800">Corrected Code:</h3>
          <pre className="text-green-900 whitespace-pre-wrap">
            {correctedCode}
          </pre>
        </div>
      )}

      {/* Display Errors */}
      {errors && (
        <div className="p-4 mt-6 bg-red-100 rounded-lg">
          <h3 className="mb-2 text-xl font-bold text-red-800">Errors/Corrections:</h3>
          <p className="text-red-900">{errors}</p>
        </div>
      )}
    </main>
  );
};

export default CodeEditor;
