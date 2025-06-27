'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiDownload, FiCode, FiEye } from 'react-icons/fi';

const HeroSection = () => {
  const { t } = useTranslation();
  const [isHovering, setIsHovering] = useState(false);
  const [animationsLoaded, setAnimationsLoaded] = useState(false);
  const containerRef = useRef(null);
  const profileRef = useRef(null);
  
  // Defer non-critical animations until after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationsLoaded(true);
    }, 100); // Small delay to prioritize LCP
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.section 
      id="home" 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      ref={containerRef}
    >
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="order-2 md:order-1"
        >          <motion.div 
            className="inline-block relative mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.span 
              className="text-lg md:text-xl text-primary-500 dark:text-primary-400 font-medium"
            >
              {t('hero.greeting')}
            </motion.span>            <motion.div 
              className="absolute -bottom-1 left-0 h-1 bg-primary-500 dark:bg-primary-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          </motion.div>          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Replaced individual letter animations with 2 word groups for better performance */}
            <motion.span 
              className="inline-block"              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              Zakaria{' '}
            </motion.span>
            <motion.span 
              className="inline-block"              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Oumghar
            </motion.span>
          </motion.h1>          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-display font-bold mb-6 relative inline-block"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-purple-600 dark:from-primary-400 dark:to-purple-500">
                {t('hero.title')}
              </span>
              
              <motion.div
                className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-primary-500 dark:text-primary-400"
                animate={{ 
                  opacity: [1, 0.4, 1],
                  x: [0, 3, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <FiCode size={24} />
              </motion.div>
            </motion.h2>
          </motion.div>

          <motion.p 
            className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            {/* CV Download Button */}
            <motion.a
              href={t('hero.cv')}
              className="group relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-400 px-6 py-3 rounded-full text-white font-medium shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              download
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="flex items-center gap-2 relative z-10">
                {t('hero.cta')} 
                <motion.span 
                  animate={{ x: isHovering ? 5 : 0 }} 
                  transition={{ duration: 0.2 }}
                >
                  <FiDownload />
                </motion.span>
              </span>
              
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-500 to-primary-400 dark:from-primary-400 dark:to-primary-300"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div 
                className="absolute top-0 left-0 w-full h-full opacity-30"
                animate={{ 
                  background: [
                    'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)', 
                    'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.15) 0%, transparent 50%)'
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.a>

            {/* Projects Button */}
            <motion.a
              href="/projects"
              className="group relative overflow-hidden border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 px-6 py-3 rounded-full text-gray-800 dark:text-gray-200 font-medium transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2 relative z-10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                {t('projects.viewAll')} 
                <motion.span 
                  initial={{ y: 0 }} 
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiEye />
                </motion.span>
              </span>
              
              <motion.div 
                className="absolute inset-0 bg-gray-100 dark:bg-gray-800 transform origin-left"
                style={{ originX: 0 }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>

          {/* <motion.div 
            className="mt-12 flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div 
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
              className="text-primary-500 dark:text-primary-400"
            >
              <FiArrowDown size={16} />
            </motion.div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {t('hero.scrollDown', 'Scroll to explore')}
            </span>
          </motion.div> */}
        </motion.div>

        {/* Interactive Profile Image */}
        <motion.div
          className="order-1 md:order-2 flex justify-center hero-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative" style={{ contain: 'layout style' }}>
            {/* Simplified glow effect - only show after animations load */}
            {animationsLoaded && (
              <motion.div 
                className="absolute -inset-2 xs:-inset-3 sm:-inset-4 bg-gradient-to-r from-primary-500 to-purple-600 dark:from-primary-400 dark:to-purple-500 rounded-full opacity-75 blur-md"
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              />
            )}

            {/* Profile image container - with responsive sizing */}
            <motion.div 
              ref={profileRef}
              className="relative w-52 h-52 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full p-1.5 bg-gradient-to-br from-primary-500 to-purple-600 dark:from-primary-400 dark:to-purple-500 profile-image"
              style={{ perspective: "1000px", contain: 'layout' }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-dark-200 p-2">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img
                    src="/assets/portfolio-image.jpeg"
                    alt="Zakaria Oumghar"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: "center 30%" }}
                    width="320"
                    height="320"
                    decoding="async"
                  />
                  
                  {/* Deferred shine effect */}
                  {animationsLoaded && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0"
                      initial={{ opacity: 0, left: "-100%" }}
                      animate={{ opacity: [0, 0.2, 0], left: ["0%", "100%"] }}
                      transition={{ 
                        repeat: Infinity, 
                        repeatDelay: 8,
                        duration: 2,
                      }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Deferred floating badges */}
            {animationsLoaded && (
              <>
                {/* Experience floating badge - responsive positioning */}
                <motion.div
                  className="absolute -top-9 sm:-top-4 sm:-right-[100px] right-0 xs:-right-10 p-2 sm:p-3 bg-white dark:bg-dark-200 backdrop-blur-lg rounded-xl shadow-lg flex flex-col items-center justify-center z-10"
                  style={{ boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.3)",
                  }}
                >
                  <motion.div 
                    animate={{ 
                      rotate: [0, 3, 0, -3, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <motion.p className="text-xs xs:text-sm sm:text-base text-primary-500 font-bold">
                      {t('hero.exp')}
                    </motion.p>
                  </motion.div>
                  <motion.p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {t('hero.field_exp')}
                  </motion.p>
                </motion.div>

                {/* Developer emoji badge - responsive positioning */}
                <motion.div
                  className="absolute -bottom-5 sm:-bottom-5 left-0 xs:-left-5 sm:-left-5 p-2 sm:p-3 bg-white dark:bg-dark-200 backdrop-blur-lg rounded-xl shadow-lg flex items-center justify-center"
                  style={{ boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.2)" }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{
                    rotate: [0, -8, 8, -8, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <motion.span 
                    className="text-2xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    👨‍💻
                  </motion.span>
                </motion.div>
                
                {/* Simplified decorative rings */}
                <div className="absolute inset-0 -z-10">
                  <motion.div
                    className="absolute inset-0 border border-primary-200 dark:border-primary-900/30 rounded-full"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="w-1.5 h-12 rounded-full border-2 border-primary-500/50 dark:border-primary-400/50 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="w-full bg-primary-500 dark:bg-primary-400 absolute top-0 rounded-full h-3"
            animate={{ y: [0, 24, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>
      </div> */}
    </motion.section>
  );
};

export default HeroSection;