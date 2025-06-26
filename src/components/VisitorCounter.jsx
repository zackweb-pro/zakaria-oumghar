'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';

const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use a flag to prevent multiple API calls
    const hasIncrementedKey = 'has_incremented_counter';
    const lastIncrementTime = sessionStorage.getItem(hasIncrementedKey);
    const now = Date.now();
    
    // Only increment once per session or if more than 30 minutes have passed
    const shouldIncrement = !lastIncrementTime || (now - parseInt(lastIncrementTime)) > 30 * 60 * 1000;
    
    // Create an AbortController to cancel duplicate requests
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchVisitorCount = async () => {
      try {
        // For production, use the specified CountAPI endpoint
        let endpoint = 'https://countapi.mileshilliard.com/api/v1/hit/zakaria-oumghar-portfolio';
        
        // If we've already incremented, use the get endpoint instead
        if (!shouldIncrement) {
          // Use get instead of hit to avoid incrementing again
          endpoint = endpoint.replace('/hit/', '/get/');
        }
        
        const response = await fetch(endpoint, { signal });
        const data = await response.json();
        
        setCount(data.value);
        console.log('CountAPI count:', data.value);
        
        // Record that we've incremented the counter
        if (shouldIncrement) {
          sessionStorage.setItem(hasIncrementedKey, now.toString());
        }
        
        setIsLoading(false);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('CountAPI error:', error);
          handleLocalhostCounter(); // Fall back to localStorage counter
        }
      }
    };
    
    // Handle localhost or fallback counter
    const handleLocalhostCounter = () => {
      try {
        // First, try to get existing data
        let data;
        try {
          const storedData = localStorage.getItem('visitor_data');
          if (storedData) {
            data = JSON.parse(storedData);
          }
        } catch (parseError) {
          console.log('Error parsing stored data:', parseError);
          localStorage.removeItem('visitor_data');
        }
        
        // Make sure we have a properly structured data object
        if (!data || typeof data !== 'object') {
          // Reset with proper structure
          data = {
            count: 315,
            lastRefresh: null
          };
        }
        
        // Get current date and time
        const now = new Date();
        
        // Only count new visits if more than 30 seconds have passed
        const lastRefresh = data.lastRefresh ? new Date(data.lastRefresh) : null;
        const isNewVisit = !lastRefresh || (now - lastRefresh > 30000);
        
        if (isNewVisit) {
          // Increment count
          data.count = (typeof data.count === 'number') ? data.count + 1 : 316;
          
          // Update last refresh time
          data.lastRefresh = now.toISOString();
          
          // Store updated data
          localStorage.setItem('visitor_data', JSON.stringify(data));
          console.log('Updated localStorage count:', data.count);
        }
        
        setCount(data.count);
        setIsLoading(false);
      } catch (error) {
        console.error('localStorage error:', error);
        setCount(315); // Ultimate fallback
        setIsLoading(false);
      }
    };

    // Uncomment this to use localStorage in development
    // if (isLocalhost) {
    //   handleLocalhostCounter();
    //   return;
    // }

    fetchVisitorCount();

    // Cleanup function to abort any pending requests when the component unmounts
    return () => {
      controller.abort();
    };
  }, []); // Empty dependency array to ensure it only runs once
  return (
    <motion.div 
      className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gray-100/80 dark:bg-dark-300/60 backdrop-blur-sm border border-gray-200 dark:border-dark-200"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: "tween" }} // Using tween instead of the default spring for better performance
      whileHover={{ scale: 1.03 }} // Reduced scale amount for smoother performance
    >
      <FiUsers className="text-primary-500 dark:text-primary-400 text-xs sm:text-sm" />
      
      {isLoading ? (
        <div className="h-3 sm:h-4 w-8 sm:w-12 bg-gray-200 dark:bg-dark-400 rounded animate-pulse"></div>
      ) : (
        <motion.span 
          className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {count?.toLocaleString()}
          <span className="text-[10px] sm:text-xs ml-1 text-gray-500 dark:text-gray-400 hidden xs:inline">visits</span>
        </motion.span>
      )}
    </motion.div>
  );
};

export default VisitorCounter;