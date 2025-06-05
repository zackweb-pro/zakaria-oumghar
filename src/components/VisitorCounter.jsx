import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';

const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        // Using simpleanalyticsdev.xyz counter API - more reliable than CountAPI
        const url = 'https://simpleanalyticsdev.xyz/api/count?domain=zakaria-oumghar';
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          // Prevent caching to always get fresh count
          cache: 'no-cache'
        });
        
        const data = await response.json();
        setCount(data.count + 100); // Add baseline for a more established look
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        
        // Fallback to stored JSON data
        try {
          const fallbackResponse = await fetch('/zakaria-oumghar/api/visitors.json');
          const fallbackData = await fallbackResponse.json();
          setCount(fallbackData.count);
        } catch (fallbackError) {
          // Ultimate fallback - localStorage counter
          const storedCount = localStorage.getItem('visitor_count');
          if (storedCount) {
            setCount(parseInt(storedCount));
          } else {
            setCount(314);
            localStorage.setItem('visitor_count', '314');
          }
        }
        setIsLoading(false);
      }
    };

    fetchVisitorCount();
    
    // Update localStorage count on visit
    const updateLocalCount = () => {
      const currentCount = localStorage.getItem('visitor_count');
      if (currentCount) {
        const newCount = parseInt(currentCount) + 1;
        localStorage.setItem('visitor_count', newCount.toString());
      } else {
        localStorage.setItem('visitor_count', '315');
      }
    };
    
    // Only count once per session
    if (!sessionStorage.getItem('counted')) {
      updateLocalCount();
      sessionStorage.setItem('counted', 'true');
    }
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