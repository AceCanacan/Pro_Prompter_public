import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import '../pages-css/followup-style.css';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = "insert openai key";

function FollowUpPage() {
  const [userInput, setUserInput] = useState('');

  const [botMessage, setBotMessage] = useState('What information do you want to include?');
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const [allMessages, setAllMessages] = useState([]);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.firstSummary) { // Ensure you're checking for the correct state property
      setSummary(state.firstSummary); // Set the summary state
      setAllMessages(state.messages); // Set the messages state
    } else {
      console.error("No summary or messages in the state");
    }
  }, [state]);

  const processAndSummarize = async () => {

    if (!API_KEY) {
      setError('API key is missing. Please provide a valid API key.');
      return;
    }

    setIsGenerating(true); // Start generating prompts
    setError('')

    setLoading(true);
    setError('');

    const systemMessage = {
      role: 'system',
      content: `
               Your goal is to make an objective summary of this. 
               It is imperative that you just provide a summary. Do not exhibit any behavior just make a summary.
               Your task: summarize this information into a few paragraphs.
               Your role: produce the summary objectively without compromising the detailed information.
               Focus on objectivity and make the summary.`
  };
  
    const userMessages = allMessages.filter(message => message.role === 'user');
  
    try {
      const response = await axios.post(API_URL, {
        model: 'gpt-4-1106-preview',
        messages: [systemMessage, ...userMessages],
        max_tokens: 150,
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
  
      const lastBotMessage = response.data.choices[0].message.content.trim();
      setSummary(lastBotMessage);
      return lastBotMessage; 
    } catch (error) {
      console.error("Error response from OpenAI:", error.response?.data);
      setError('Failed to process and summarize messages. Please try again.');
      return null;
    }

    setIsGenerating(false);

  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    const primeMessage = {
      role: 'system', 
      content: ` This is a prompt that will be given to a chatbot [${summary}]
                Your goal is to gather information that will complement that behavior . 
                It is imperative that you just provide a question. Do not exhibit any behavior just ask questions.
                Your task: gather information from the user that will be relevant to the prompt.
                Your role: ask clear questions to gather details, not to offer suggestions.
                Focus on precision. Ask one question at a time to create an accurate new prompt`
    };
    
    const userMessage = { role: 'user', content: userInput };

    try {
      const response = await axios.post(API_URL, {
        model: 'gpt-4-1106-preview',
        messages: [primeMessage, userMessage],
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      setBotMessage(response.data.choices[0].message.content.trim());
      setQuestionCount(prevCount => prevCount + 1);
      setAllMessages(prevMessages => [...prevMessages, userMessage]);
    } catch (error) {
      console.error("Error response from OpenAI:", error.response?.data);
    }

    setUserInput('');
    setLoading(false);
  };



  const handleDoneFollowUpPage = async () => {
    const confirmFinish = window.confirm("Are you sure you want to finish and generate the prompts?");
    if (confirmFinish) {
      await processAndSummarize()
        .then((newSummary) => {
          if (!error) {
            navigate('/summary', {
              state: {
                firstSummary: state.firstSummary,
                secondSummary: newSummary
              }
            });
          }
        })
        .catch((error) => {
          console.error("Failed to summarize:", error);
        });
    } else {
    }
  };
  


  return (
    <div className='body'>
      <div className="main-container-chatpage">
        {isGenerating ? (
          <div className="loading-screen">Generating Prompts...</div>
        ) : (
          <>
            <div className="bot-message">
              <span>{botMessage}</span>
            </div>
  
            <div className="input-container-chat">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type a message..."
                disabled={loading || questionCount > 10}
                className="user-input"
              />
              {questionCount <= 10 && (
                <button 
                  onClick={sendMessage} 
                  disabled={loading || !userInput.trim()}
                  className="send-button"
                >
                  Send
                </button>
              )}
              {questionCount >= 1 && (
                <button
                  onClick={handleDoneFollowUpPage}
                  className="done-button"
                  disabled={loading || allMessages.length === 0}
                >
                  Done
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
  
}

export default FollowUpPage;