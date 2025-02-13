import  { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AuthContext';
const MentorAppointment = () => {
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const plugin1=import.meta.env.VITE_PLUGIN_ID1
  const plugin2=import.meta.env.VITE_PLUGIN_ID2
  const chatApiKey= import.meta.env.VITE_CHAT_API_KEY;
  const {user} = useAppContext(); 

    if(!user){
     return(
      <div className='flex items-center justify-center w-full min-h-screen'>please login first:  <a href="/login"><button className='p-2 bg-blue-500 rounded-md '>Login</button></a> </div>
     )
    }

  // Function to create a chat session
  async function createChatSession() {
    try {
      const response = await axios.post(
        'https://api.on-demand.io/chat/v1/sessions',
        {
          pluginIds: [plugin1,plugin2],
          externalUserId: 'test'
        },
        {
          headers: {
            apikey: chatApiKey
          }
        }
      );
      return response.data.data.id; 
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
          pluginIds:  [plugin1,plugin2],
          responseMode: 'sync'
        },
        {
          headers: {
            apikey: chatApiKey
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
      // Format and return the query response
      return formatResponse(queryResponse); 
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
        .filter(line => line.trim() !== '')
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
      setMessages([...messages, { text: input, isBot: false }, { text: `Sorry, something went wrong.${error}`, isBot: true }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="container p-6 mx-auto">
      <h2 className="mb-6 text-3xl font-bold">Mentor Appointment</h2>
      <div className="flex flex-col h-[500px] max-h-[500px] border rounded-lg overflow-hidden">
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.isBot ? 'text-gray-600 dark:text-gray-300' : 'text-blue-600'}`}>
              <div className={`p-2 rounded-lg ${msg.isBot ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-100'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center p-4 text-black bg-white dark:bg-gray-800">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSending}
            className="flex-1 p-2 mr-2 border rounded-lg"
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
