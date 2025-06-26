'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiArrowUp } from 'react-icons/fi';
import { FaLaptopCode } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-dark-200 py-12 relative overflow-hidden">
      {/* Minimalist animated particles for footer - further reduced and optimized */}
      <div className="absolute inset-0 opacity-20 dark:opacity-25 overflow-hidden">
        {/* Reduced particle count from 12 to 6 */}
        {[...Array(6)].map((_, i) => {
          // Fixed positions for better performance
          const positions = [
            {x: 20, y: 30}, {x: 50, y: 20}, {x: 80, y: 35},
            {x: 25, y: 70}, {x: 60, y: 80}, {x: 85, y: 65}
          ];
          
          // Fixed sizes for consistency
          const size = 2 + (i % 3); // 2-4px
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500"
              style={{
                left: `${positions[i].x}%`,
                top: `${positions[i].y}%`,
                width: size,
                height: size,
                filter: "blur(0.5px)",
                boxShadow: "0 0 8px 0 rgba(59, 130, 246, 0.3)"
              }}
              animate={{
                // Limited movement range
                x: [0, (i % 2 === 0) ? 20 : -20], 
                y: [0, (i % 2 === 0) ? -15 : 15],
                opacity: [0.2, 0.4, 0.2], // Reduced opacity range
              }}
              transition={{
                duration: 15 + (i * 3), // Between 15-30s
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear" // More efficient than easeInOut
              }}
            />
          );
        })}
      </div>

      {/* Subtle mesh gradient background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 30%),
            radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.2) 0%, transparent 40%)
          `,
          opacity: 0.1,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Grid pattern - more subtle in footer */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.4
        }}
      />

      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none mix-blend-overlay" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: '8px 8px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-display font-bold">
              <span className="gradient-text">ZACKWEB</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center">
              {t('footer.madeWith')} 
              <motion.span 
                className="inline-flex ml-1 text-purple-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaLaptopCode />
              </motion.span>
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 bg-white dark:bg-dark-100 rounded-full shadow-md mb-4 hover:shadow-lg transition-shadow duration-300 relative group"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowUp className="text-primary-500 group-hover:text-primary-600 transition-colors duration-300" />
              <motion.div 
                className="absolute inset-0 rounded-full bg-primary-500/10 dark:bg-primary-400/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              &copy; {currentYear} Zakaria Oumghar. {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;