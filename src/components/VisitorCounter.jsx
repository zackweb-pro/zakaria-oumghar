import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';

const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      // Check if we're in a local development environment
      const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
      
      // If localhost, use localStorage directly without trying the API
      if (isLocalhost) {
        handleLocalhostCounter();
        return;
      }
      
      // For production, try CountAPI with fallbacks
      try {
        const namespace = 'zackweb-portfolio';
        const key = 'visits';
        
        const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
        const data = await response.json();
        
        setCount(data.value);
        console.log('CountAPI count:', data.value);
        setIsLoading(false);
      } catch (error) {
        console.error('CountAPI error:', error);
        
        // First fallback - try to get the count without incrementing
        try {
          const getResponse = await fetch(`https://api.countapi.xyz/get/zackweb-portfolio/visits`);
          const getData = await getResponse.json();
          setCount(getData.value);
          console.log('CountAPI get count:', getData.value);
        } catch (secondError) {
          console.error('CountAPI fallback error:', secondError);
          
          // Second fallback - use a different CountAPI domain
          try {
            const altResponse = await fetch(`https://countapi.vercel.app/api/zackweb-portfolio/visits/increment`);
            const altData = await altResponse.json();
            setCount(altData.value);
            console.log('Alternative CountAPI count:', altData.value);
          } catch (thirdError) {
            console.error('All CountAPI attempts failed:', thirdError);
            handleLocalhostCounter(); // Use localStorage as final fallback
          }
        }
        
        setIsLoading(false);
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
          // Clear corrupted data
          localStorage.removeItem('visitor_data');
        }
        
        // Make sure we have a properly structured data object
        if (!data || typeof data !== 'object' || !Array.isArray(data.visits)) {
          // Reset with proper structure if data is missing or malformed
          data = {
            count: 315,
            visits: [],
            lastRefresh: null
          };
        }
        
        // Get current date and time for tracking
        const now = new Date();
        
        // Only count new visits/refreshes if more than 30 seconds have passed
        const lastRefresh = data.lastRefresh ? new Date(data.lastRefresh) : null;
        const isNewVisit = !lastRefresh || (now - lastRefresh > 30000);
        
        if (isNewVisit) {
          // Add this visit to the list (safely)
          if (!Array.isArray(data.visits)) {
            data.visits = [];
          }
          
          data.visits.push(now.toISOString());
          
          // Keep only most recent 50 visits
          if (data.visits.length > 50) {
            data.visits = data.visits.slice(-50);
          }
          
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