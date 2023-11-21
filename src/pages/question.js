import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import '../pages-css/followup-style.css';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = "insert openai key";

function QuestionPage() {

  const [userInput, setUserInput] = useState('');
  const [botMessage, setBotMessage] = useState('How do you want the chatbot to behave?');
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const [allMessages, setAllMessages] = useState([]);

  const [isProcessing, setIsProcessing] = useState(false);

  const [error,setError] = useState([]);
  const [summary,setSummary] = useState([]);
  

  const navigate = useNavigate();

const processAndSummarize = async () => {
    if (!API_KEY) {
      setError('API key is missing. Please provide a valid API key.');
      return;
    }
    
    setLoading(true);
    setError('');
  
    // Filter out only user messages
    const userMessages = allMessages.filter(message => message.role === 'user');
  
    const systemMessage = {
      role: 'system',
      content: `Create a prompt that directs a chatbot's behavior based on user messages. 
                The prompt should interpret the intent and content of the messages and convert them into commands 
                that sounds like "You are a chatbot that ". 
                The command should clearly instruct the chatbot on how to 
                incorporate the essence of the messages into its operational framework.`
    };
  
    const conversationMessages = [systemMessage, ...userMessages]; 
  
    try {
      const response = await axios.post(API_URL, {
        model: 'gpt-4-1106-preview',
        messages: conversationMessages,
        max_tokens: 150,
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
  
      const lastBotMessage = response.data.choices[0].message.content.trim();
      setSummary(lastBotMessage);
      console.log(lastBotMessage); // Updated to log lastBotMessage instead of summary to reflect the newly obtained summary
      return lastBotMessage; 
    } catch (error) {
      console.error("Error response from OpenAI:", error.response?.data);
      setError('Failed to process and summarize messages. Please try again.');
    }
  
    setLoading(false);
  };  

  const handleDoneQuestionPage = async () => {
    const isConfirmed = window.confirm("Are you sure you want to proceed to the information page?");

    if (isConfirmed) {
      setIsProcessing(true); // Set processing state for navigation
      try {
        const summaryResult = await processAndSummarize(); 
        setIsProcessing(false); // Reset processing state after completion
        if (summaryResult) { 
          navigate('/follow-up', { state: { messages: allMessages, firstSummary: summaryResult } });
        } else {
        }
      } catch (error) {
        console.error("Failed to process:", error);
        setIsProcessing(false); // Reset processing state in case of error
      }
    } else {
    }
  };


  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    const primeMessage = {
      role: 'system', 
      content: `You are a chatbot designed to develop prompts. 
                Your goal is to gather information that will be recorded and be given to another chatbot. 
                It is imperative that you just provide a question. Do not exhibit any behavior just ask questions.
                Your task: create a prompt guiding a chatbot's specific behavior.
                Your role: ask clear questions to gather details, not to offer suggestions.
                Focus on precision. Ask one question at a time to create an accurate new prompt.
                The first question is "How do you want the chatbot to behave?"
      `
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

  return (
    <div className="body">
      <div className="main-container-chatpage">
        {isProcessing ? (
          <div className="loading-screen">Processing...</div>
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
                  onClick={handleDoneQuestionPage}
                  disabled={loading || allMessages.length === 0}
                  className="done-button"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
  
  
}

export default QuestionPage;