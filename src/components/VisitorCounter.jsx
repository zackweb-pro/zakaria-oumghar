import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';

const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        // Calculate a unique page view ID based on timestamp
        // This ensures we can track refreshes while avoiding counting duplicates in a short time
        const viewId = Math.floor(Date.now() / 10000); // Changes every 10 seconds
        const lastViewId = sessionStorage.getItem('last_view_id');
        
        // Get or initialize stored count
        const storedCount = localStorage.getItem('visitor_count');
        let currentCount = storedCount ? parseInt(storedCount) : 314;
        
        // Increment count if this is a new view (refresh)
        if (lastViewId !== viewId.toString()) {
          currentCount += 1;
          localStorage.setItem('visitor_count', currentCount.toString());
          sessionStorage.setItem('last_view_id', viewId.toString());
          
          console.log('Counter incremented to:', currentCount);
        }
        
        setCount(currentCount);
        setIsLoading(false);
        
        // Check StatCounter to see if it's loaded
        const checkScLoaded = setInterval(() => {
          if (window._statcounter) {
            console.log('StatCounter detected');
            clearInterval(checkScLoaded);
          }
        }, 1000);
        
        // Clear interval after 5 seconds (avoid memory leaks)
        setTimeout(() => clearInterval(checkScLoaded), 5000);
        
      } catch (error) {
        console.error('Error with visitor counter:', error);
        
        // Fallback to GitHub Actions JSON
        try {
          const fallbackResponse = await fetch('/zakaria-oumghar/api/visitors.json');
          const fallbackData = await fallbackResponse.json();
          setCount(fallbackData.count);
        } catch (fallbackError) {
          setCount(315); // Ultimate fallback
        }
        
        setIsLoading(false);
      }
    };

    fetchVisitorCount();

    return () => {
      // Cleanup any intervals if component unmounts
    };
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