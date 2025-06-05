import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';

const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        // Your site's unique namespace - use your domain or GitHub repo name
        const namespace = 'zakaria-oumghar-portfolio';
        const key = 'visits';
        
        // First visit from this browser increments count
        const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
        const data = await response.json();
        
        // Set the count from the API
        setCount(data.value);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        
        // Fallback to GitHub Actions count if API fails
        try {
          const fallbackResponse = await fetch('/zakaria-oumghar/api/visitors.json');
          const fallbackData = await fallbackResponse.json();
          setCount(fallbackData.count);
        } catch (fallbackError) {
          // Ultimate fallback
          setCount(314);
        }
        setIsLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <motion.div 
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100/80 dark:bg-dark-300/60 backdrop-blur-sm border border-gray-200 dark:border-dark-200"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <FiUsers className="text-primary-500 dark:text-primary-400" />
      
      {isLoading ? (
        <div className="h-4 w-12 bg-gray-200 dark:bg-dark-400 rounded animate-pulse"></div>
      ) : (
        <motion.span 
          className="text-xs font-medium text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {count?.toLocaleString()}
          <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">visits</span>
        </motion.span>
      )}
    </motion.div>
  );
};

export default VisitorCounter;