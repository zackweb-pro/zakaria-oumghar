import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiDownload, FiArrowDown, FiCode, FiEye } from 'react-icons/fi';
import profile from "../assets/portfolio-image.jpeg";
import { throttle } from '../utils/animationUtils';

const HeroSection = () => {
  const { t } = useTranslation();
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const profileRef = useRef(null);
  useEffect(() => {
    // Throttled mouse move handler - only updates every 50ms for better performance
    const handleMouseMove = throttle((e) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      setMousePosition({ x, y });
    }, 50); // 50ms throttle for smoother performance

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Animate background patterns based on mouse movement
  const patternX = useRef(0);
  const patternY = useRef(0);
  
  useEffect(() => {
    controls.start({
      backgroundPosition: `${mousePosition.x * 10}% ${mousePosition.y * 10}%`,
      transition: { type: 'spring', stiffness: 10, damping: 20 }
    });
    
    // No more profile image movement based on mouse position
  }, [mousePosition, controls]);
  // Create animated floating particles with optimized values
  // Using predetermined positions instead of random values on each render
  // Reduced from 30 to 20 particles for better performance
  const particles = Array.from({ length: 20 }).map((_, i) => {
    // Using index-based calculations instead of random for deterministic values
    const baseX = (i % 5) * 20; // 5 columns
    const baseY = Math.floor(i / 5) * 25; // 4 rows
    
    return {
      id: i,
      x: baseX + (i % 7) * 3, // slight variation
      y: baseY + (i % 3) * 5, // slight variation
      size: 1 + (i % 6), // Size between 1-6px
      duration: 10 + (i % 10) * 2 // Duration between 10-28s
    };
  });

  return (
    <motion.section 
      id="home" 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      ref={containerRef}
    >
      {/* Subtle base background tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-purple-50/30 dark:from-dark-300/20 dark:to-dark-400/20" />

      {/* Enhanced animated particles with better contrast */}
      <div className="absolute inset-0 opacity-25 dark:opacity-30 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              filter: "blur(0.5px)",
              boxShadow: "0 0 8px 0 rgba(59, 130, 246, 0.3)"
            }}            animate={{
              x: [0, particle.id % 2 === 0 ? 40 : -40], // Simpler movement paths
              y: [0, particle.id % 3 === 0 ? -30 : 30], // Simpler movement paths
              opacity: [0.2, 0.5, 0.2], // Reduced opacity range
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear" // Linear easing is less CPU intensive
            }}
          />
        ))}
      </div>

      {/* Improved mesh gradient background with mode-specific colors */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={controls}
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 30%),
            radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 40%)
          `,
          opacity: 0.15,
          backgroundSize: '200% 200%',
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Dark mode specific overlay for better gradient appearance */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary-900/5 to-purple-900/5 dark:from-transparent dark:via-primary-400/10 dark:to-purple-400/10 pointer-events-none"
      />

      {/* Enhanced grid pattern with better visibility in light mode */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.07) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(99, 102, 241, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: `${patternX.current}px ${patternY.current}px`,
          opacity: 0.5
        }}
      />

      {/* Texture overlay for added depth */}
      <div 
        className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none mix-blend-overlay" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: '8px 8px'
        }}
      />

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="order-2 md:order-1"
        >
          <motion.div 
            className="inline-block relative mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="text-lg md:text-xl text-primary-500 dark:text-primary-400 font-medium"
            >
              {t('hero.greeting')}
            </motion.span>
            <motion.div 
              className="absolute -bottom-1 left-0 h-1 bg-primary-500 dark:bg-primary-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.div>          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Replaced individual letter animations with 2 word groups for better performance */}
            <motion.span 
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Zakaria{' '}
            </motion.span>
            <motion.span 
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Oumghar
            </motion.span>
          </motion.h1>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
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
              href="#projects"
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

          <motion.div 
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
          </motion.div>
        </motion.div>

        {/* Interactive Profile Image */}
        <motion.div
          className="order-1 md:order-2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative">
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-purple-600 dark:from-primary-400 dark:to-purple-500 rounded-full opacity-75 blur-md"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />

            {/* Profile image container */}
            <motion.div 
              ref={profileRef}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1.5 bg-gradient-to-br from-primary-500 to-purple-600 dark:from-primary-400 dark:to-purple-500"
              style={{ perspective: "1000px" }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-dark-200 p-2">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img
                    src={profile}
                    alt="Zakaria Oumghar"
                    loading='lazy'
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: "center 30%" }} // Adjust this value to center on your face
                  />
                  
                  {/* Shine effect on image */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0"
                    initial={{ opacity: 0, left: "-100%" }}
                    animate={{ opacity: [0, 0.4, 0], left: ["0%", "100%"] }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatDelay: 5,
                      duration: 1.5,
                    }}
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Experience floating badge */}
            <motion.div
              className="absolute -top-4 -right-20 p-3 bg-white dark:bg-dark-200 backdrop-blur-lg rounded-xl shadow-lg flex flex-col items-center justify-center z-10"
              style={{ boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{
                y: -5,
                boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.3)",
              }}
            >
              <motion.div 
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.p className="text-base text-primary-500 font-bold">
                  {t('hero.exp')}
                </motion.p>
              </motion.div>
              <motion.p className="text-sm text-gray-600 dark:text-gray-400">
                {t('hero.field_exp')}
              </motion.p>
            </motion.div>

            {/* Developer emoji badge */}
            <motion.div
              className="absolute -bottom-5 -left-5 p-3 bg-white dark:bg-dark-200 backdrop-blur-lg rounded-xl shadow-lg flex items-center justify-center"
              style={{ boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.2)" }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 }
              }}
            >
              <motion.span 
                className="text-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👨‍💻
              </motion.span>
            </motion.div>
            
            {/* Animated decorative rings */}
            <div className="absolute inset-0 -z-10">
              <motion.div
                className="absolute inset-0 border-2 border-primary-200 dark:border-primary-900/30 rounded-full"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div
                className="absolute inset-0 border border-dashed border-primary-300/50 dark:border-primary-700/50 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
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
      </div>
    </motion.section>
  );
};

export default HeroSection;