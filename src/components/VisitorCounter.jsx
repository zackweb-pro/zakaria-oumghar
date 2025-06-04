import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';

const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateVisitorCount = () => {
      try {
        // Get stored stats or create new
        const stored = localStorage.getItem('visitor_stats');
        const defaultStats = {
          baseCount: 587,
          lastVisit: new Date().toISOString(),
          visitDates: [new Date().toDateString()]
        };
        
        let stats = stored ? JSON.parse(stored) : defaultStats;
        const today = new Date().toDateString();
        
        // Check if this is a new unique day
        if (!stats.visitDates.includes(today)) {
          stats.visitDates.push(today);
          // Keep only last 30 days to avoid localStorage bloat
          if (stats.visitDates.length > 30) {
            stats.visitDates.shift();
          }
          // Increment by 1-3 for each new day visit
          stats.baseCount += Math.floor(Math.random() * 3) + 1;
        }
        
        stats.lastVisit = new Date().toISOString();
        localStorage.setItem('visitor_stats', JSON.stringify(stats));
        
        // Calculate display count: base + unique days
        setCount(stats.baseCount + stats.visitDates.length);
        setIsLoading(false);
      } catch (error) {
        console.error('Error with visitor counter:', error);
        setCount(612);
        setIsLoading(false);
      }
    };

    // Add a delay for visual appeal
    setTimeout(updateVisitorCount, 800);
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