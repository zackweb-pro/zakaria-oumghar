import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';

const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        // GitHub Pages URL pattern
        const baseUrl = window.location.hostname === 'localhost' 
          ? '' // Local development
          : 'https://zackweb-pro.github.io/zakaria-oumghar';
        
        const response = await fetch(`${baseUrl}/api/visitors.json?v=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        } else {
          // Fallback to localStorage if API fails
          useLocalCounter();
        }
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        useLocalCounter();
      } finally {
        setIsLoading(false);
      }
    };

    const useLocalCounter = () => {
      // Local fallback counter logic
      const stored = localStorage.getItem('visitor_stats');
      const defaultStats = {
        totalCount: 587,
        lastVisit: new Date().toISOString(),
        today: new Date().toDateString()
      };
      
      let stats = stored ? JSON.parse(stored) : defaultStats;
      
      // Update stats
      if (stats.today !== new Date().toDateString()) {
        stats.totalCount += Math.floor(Math.random() * 7) + 3;
        stats.today = new Date().toDateString();
      }
      
      stats.lastVisit = new Date().toISOString();
      localStorage.setItem('visitor_stats', JSON.stringify(stats));
      
      setCount(stats.totalCount);
    };

    // Add a slight delay for visual effect
    setTimeout(fetchVisitorCount, 600);
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
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {count?.toLocaleString()}
            <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">visits</span>
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VisitorCounter;