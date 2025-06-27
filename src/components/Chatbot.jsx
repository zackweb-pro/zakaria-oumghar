'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsRobot as FiBot } from "react-icons/bs";
import { FiMessageCircle, FiX, FiSend, FiUser} from 'react-icons/fi';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyBGdwJvYShWIAwiieLiVholWqNayzbbeiM";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  // Portfolio context for the AI
  const portfolioContext = `
You are a helpful assistant answering questions about Zakaria Oumghar based on his portfolio. Here's information about him:

Personal Information:
- Name: Zakaria Oumghar
- Current Role: Software Engineering Student at ENSIAS, Mohammed V University (2023 - Present)
- Location: Morocco
- Experience: 4+ years in Web Development

Education:
- Software Engineering at ENSIAS, Mohammed V University (2023 - Present)
- Preparatory Classes - TSI at CPGE SETTAT (2021 - 2023)
- Baccalaureate in Technical Sciences at Imam Malik Technical High School, Berrechid (2018 - 2021)

Professional Experience:
- Software Engineering Intern at Somap & Services (July - August 2024, Hybrid, Kenitra, Morocco)
  * Developed a complete digital solution (GAP) for purchase tracking and personnel management
  * Designed and implemented a full-stack web application using React.js, Tailwind CSS, Node.js, and MySQL
  * Collaborated with stakeholders to identify needs and deliver a user-friendly interface

Skills:
Frontend: React.js, Tailwind CSS, Framer Motion, HTML, CSS, JavaScript
Backend: Node.js, Express.js, Spring Boot, Python, Flask
Databases: MySQL, PostgreSQL, Oracle DB
Tools & Others: Docker, GitHub Actions, Microservices, OCI, Chrome Extensions

Projects:
1. Management of department in ENSIAS - Spring Boot, React.js, microservices, Docker, GitHub Actions, PostgreSQL
2. Management of Employee Records and Purchase Requests (Internship project) - React.js, Tailwind CSS, MySQL, Node.js
3. Student Interface for Internship Applications - React.js, Node.js, Oracle DB, OCI
4. ENSIAS Chatbot - Python, Flask, NeuralIntents
5. Form Saver Pro (Chrome Extension) - JavaScript, Local Storage

Interests: UI/UX, Backend engineering, DevOps, Web Development, Mobile Apps, AI & Machine Learning, Open Source Contributions, Playing Video Games, Playing Chess

Contact: Available through his portfolio contact form

Please answer questions about Zakaria professionally and accurately based on this information. If asked about something not in this context, politely mention that you can only provide information available in his portfolio.
`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'bot',
          content: `Hello! I'm Zakaria's AI assistant. I can answer questions about his skills, experience, projects, and background. How can I help you learn more about him?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${portfolioContext}\n\nUser question: ${inputValue}`
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      const aiResponse = data.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't process your question. Please try again.";

      const botMessage = {
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        type: 'bot',
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* CSS Custom Properties for Dark Mode */}
      <style jsx>{`
        :global(:root) {
          --chatbot-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.95) 100%);
          --chatbot-border: rgba(255, 255, 255, 0.1);
        }
        :global(.dark) {
          --chatbot-bg: linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%);
          --chatbot-border: rgba(255, 255, 255, 0.05);
        }
      `}</style>

      {/* Floating Chatbot Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
          boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <FiMessageCircle size={24} />
      </motion.button>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-96 rounded-lg shadow-2xl border border-gray-200/50 dark:border-gray-700/50 flex flex-col overflow-hidden backdrop-blur-md"
            style={{
              background: 'var(--chatbot-bg)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px var(--chatbot-border) inset'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20 text-white relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Header gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20 pointer-events-none"></div>
              
              <div className="flex items-center space-x-2 relative z-10">
                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                  <FiBot size={20} />
                </div>
                <h3 className="font-semibold">Ask about Zakaria</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors relative z-10 backdrop-blur-sm"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 relative bg-gray-50/80 dark:bg-dark-200/80">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%),
                                   radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`
                }}
              ></div>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg' 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 text-gray-700 dark:text-gray-200 shadow-md'
                    }`}>
                      {message.type === 'user' ? <FiUser size={14} /> : <FiBot size={14} />}
                    </div>
                    <div className={`p-3 rounded-lg shadow-sm ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white' 
                        : 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-600'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="p-2 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 text-gray-700 dark:text-gray-200 shadow-md">
                      <FiBot size={14} />
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border border-gray-100 dark:border-gray-600 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/20 dark:border-gray-600/30 bg-white/90 dark:bg-dark-100/90 backdrop-blur-md">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Zakaria's skills, projects, etc..."
                  className="flex-1 p-3 border border-gray-200/50 dark:border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 bg-white/90 dark:bg-dark-300/90 text-gray-900 dark:text-gray-100 text-sm backdrop-blur-sm shadow-sm placeholder-gray-400 dark:placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-3 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-md"
                  style={{
                    background: !inputValue.trim() || isLoading 
                      ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)' 
                      : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                  }}
                >
                  <FiSend size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
