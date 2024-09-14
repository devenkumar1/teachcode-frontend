import React, { useState } from 'react';
import axios from 'axios';

const MentorAppointment = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Function to create a chat session
  async function createChatSession() {
    try {
      const response = await axios.post(
        'https://api.on-demand.io/chat/v1/sessions',
        {
          pluginIds: [],
          externalUserId: 'test'
        },
        {
          headers: {
            apikey: "yk86jHmoVkcbzvzaC8bJRgO379ydyphv"
          }
        }
      );
      return response.data.data.id; // Extract session ID
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw error;
    }
  }

  // Function to submit a query to the session
  async function submitQuery(sessionId, userQuery) {
    try {
      const response = await axios.post(
        `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
        {
          endpointId: 'predefined-openai-gpt4o',
          query: userQuery,
          pluginIds: ['plugin-1726258392'],
          responseMode: 'sync'
        },
        {
          headers: {
            apikey: "yk86jHmoVkcbzvzaC8bJRgO379ydyphv"
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error submitting query:', error);
      throw error;
    }
  }

  // Main function to execute the API calls
  async function main(userQuery) {
    try {
      const sessionId = await createChatSession();
      const queryResponse = await submitQuery(sessionId, userQuery);
      return formatResponse(queryResponse); // Format and return the query response
    } catch (error) {
      console.error('Error in main function:', error);
      throw error;
    }
  }

  // Function to format the response
  function formatResponse(response) {
    // Assuming response.data.answer is a string and needs to be split into paragraphs
    if (response && response.data && response.data.answer) {
      // Split the response into paragraphs based on new lines
      return response.data.answer
        .split('\n')
        .filter(line => line.trim() !== '') // Remove empty lines
        .map((line, index) => (
          <p key={index} className="mb-2">{line}</p>
        ));
    }
    return <p>Sorry, there was an issue with the response.</p>;
  }

  // Handler to send a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');
    setIsSending(true);

    try {
      // Send the user's message to the backend
      const response = await main(input);
      setMessages([...messages, { text: input, isBot: false }, { text: response, isBot: true }]);
    } catch (error) {
      setMessages([...messages, { text: input, isBot: false }, { text: 'Sorry, something went wrong.', isBot: true }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Mentor Appointment</h2>
      <div className="flex flex-col h-[500px] max-h-[500px] border rounded-lg overflow-hidden">
        <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.isBot ? 'text-gray-600 dark:text-gray-300' : 'text-blue-600'}`}>
              <div className={`p-2 rounded-lg ${msg.isBot ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-100'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSending}
            className="flex-1 border rounded-lg p-2 mr-2"
            placeholder="Type your message here..."
          />
          <button
            onClick={handleSendMessage}
            disabled={isSending}
            className={`bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg ${isSending ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default MentorAppointment;
