import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiUser, FiMessageCircle as FiBot } from 'react-icons/fi';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const GEMINI_API_KEY = "AIzaSyBGdwJvYShWIAwiieLiVholWqNayzbbeiM";
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
      {/* Floating Chatbot Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
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
            className="fixed bottom-6 right-6 z-50 w-96 h-96 bg-white dark:bg-dark-300 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-blue-600 text-white">
              <div className="flex items-center space-x-2">
                <FiBot size={20} />
                <h3 className="font-semibold">Ask about Zakaria</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-blue-700 rounded transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'}`}>
                      {message.type === 'user' ? <FiUser size={14} /> : <FiBot size={14} />}
                    </div>
                    <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
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
                    <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                      <FiBot size={14} />
                    </div>
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Zakaria's skills, projects, etc..."
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-400 text-gray-900 dark:text-gray-100 text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
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
