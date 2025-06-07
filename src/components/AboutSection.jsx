import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiCode, FiAward, FiCalendar, FiMapPin, FiBriefcase } from 'react-icons/fi';
import { useThrottledInView, throttle, optimizedViewport } from '../utils/animationUtils';

const AboutSection = () => {  const { t } = useTranslation();
  const ref = useRef(null);
  const sectionRef = useRef(null);  // Using throttled in-view detection
  const isInView = useThrottledInView(ref, { once: false });
  const imageRef = useRef(null);
  
  // For scroll-based effects, let's use a simplified approach without dependencies
  const [scrollEffects, setScrollEffects] = useState({ y: 0, rotate: 0, scale: 1 });
  
  // Add scroll event listener for parallax effect
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!sectionRef.current) return;
      
      // Get section position relative to viewport
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the section we've scrolled (0 to 1)
      let progress = 1 - (rect.bottom / (windowHeight + rect.height));
      progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
      
      // Apply transformations based on scroll progress
      setScrollEffects({
        y: -30 * progress,
        rotate: 2 * progress,
        scale: 1 + (progress < 0.5 ? progress * 0.06 : (1 - progress) * 0.06)
      });
    }, 100); // 100ms throttle
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);  // Animation variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }, // Reduced delay and stagger time
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Update all viewport settings to use optimizedViewport configuration
  const updateViewportSettings = () => {
    // All timeline connectors
    document.querySelectorAll('.timeline-connector').forEach(el => {
      el.setAttribute('data-viewport', JSON.stringify(optimizedViewport));
      el.setAttribute('data-duration', '1');
    });
    
    // All experience and education items
    document.querySelectorAll('.timeline-item').forEach((el, index) => {
      el.setAttribute('data-viewport', JSON.stringify(optimizedViewport));
      el.setAttribute('data-delay', String(0.08 * index));
      el.setAttribute('data-duration', '0.4');
    });
      // All interest items
    document.querySelectorAll('.interest-item').forEach((el) => {
      el.setAttribute('data-viewport', JSON.stringify(optimizedViewport));
    });
  };
  
  // Call the function on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      updateViewportSettings();
    }
  }, []);

  const education = Array.isArray(t('about.educationList', { returnObjects: true })) ? t('about.educationList', { returnObjects: true }) : [];
  const interests = Array.isArray(t('about.interestsList', { returnObjects: true })) ? t('about.interestsList', { returnObjects: true }) : [];
  const experience = Array.isArray(t('about.experienceList', { returnObjects: true })) ? t('about.experienceList', { returnObjects: true }) : [];

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="section-padding bg-gray-50 dark:bg-dark-200 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl opacity-30 translate-x-1/3"></div>
      
      {/* Decorative orbiting circles */}
      <div className="hidden lg:block absolute left-10 top-1/3 w-8 h-8 rounded-full bg-primary-500/10 dark:bg-primary-400/10" style={{ animation: 'orbit 15s infinite linear' }}></div>
      <div className="hidden lg:block absolute right-10 top-1/4 w-4 h-4 rounded-full bg-primary-500/10 dark:bg-primary-400/10" style={{ animation: 'orbit 12s infinite linear reverse' }}></div>

      {/* Optimized background particles with reduced count and complexity */}
      <div className="absolute inset-0 opacity-25 dark:opacity-30 overflow-hidden">
        {[...Array(12)].map((_, i) => {
          // Use fixed positions based on index for better performance
          const col = i % 4;
          const row = Math.floor(i / 4);
          const posX = (col * 25) + 5; // 4 columns, 25% spacing with 5% offset
          const posY = (row * 33) + 5; // 3 rows, 33% spacing with 5% offset
          
          // Size and styles based on predictable patterns rather than random values
          const size = 2 + (i % 5); // 2-6px size
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                width: size,
                height: size,
                filter: "blur(0.5px)",
                boxShadow: "0 0 8px 0 rgba(59, 130, 246, 0.3)"
              }}
              animate={{
                x: [0, i % 2 === 0 ? 30 : -30], // Alternating directions
                y: [0, i % 3 === 0 ? 20 : -20], // Variation in movement
                opacity: [0.2, 0.5, 0.2], // Reduced opacity range
              }}
              transition={{
                duration: 12 + (i * 1.5), // Deterministic durations 12-30s
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear" // Linear easing is less CPU intensive
              }}
            />
          );
        })}
      </div>

      {/* Mesh gradient background like in Hero Section */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 30%),
            radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 40%)
          `,
          opacity: 0.15,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Grid pattern like in Hero Section */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.07) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(99, 102, 241, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.5
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
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Title section - unchanged */}
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-display font-bold text-center mb-12 relative"
          >
            {t('about.title')}
            <motion.div 
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-primary-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '60px' }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            <motion.div variants={itemVariants} className="md:col-span-2">
              <motion.p 
                className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {t('about.description')}
              </motion.p>

              {/* New Experience Timeline */}
              <div className="mt-12 relative">
                <h3 className="text-xl font-semibold mb-10 flex items-center">
                  <span className="mr-2">{t('about.experience')}</span>
                  <motion.div 
                    className="h-px bg-gradient-to-r from-primary-500 via-primary-300 to-transparent flex-grow ml-3" 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </h3>
                
                {/* Timeline connector */}
                <motion.div 
                  className="absolute left-0 top-10 bottom-20 w-[2px] bg-gradient-to-b from-primary-500 via-primary-300 to-transparent timeline-connector"
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ height: "100%", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                />
                
                {/* Experience cards */}
                <div className="space-y-16 ml-6 relative">
                  {experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, delay: index * 0.2 }}
                      className="relative timeline-item"
                    >
                      {/* Timeline node */}
                      <motion.div 
                        className="absolute -left-10 w-3.5 h-3.5 rounded-full bg-primary-500 border-4 border-white dark:border-dark-200 shadow-md"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.5, backgroundColor: "#0284c7" }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      />
                      
                      {/* Glow effect for the node */}
                      <div className="absolute -left-10 w-3.5 h-3.5 rounded-full bg-primary-400 opacity-40 blur-sm" />

                      {/* Experience card */}
                      <motion.div 
                        className="relative bg-white dark:bg-dark-100 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700/30"
                        whileHover={{ 
                          y: -5, 
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                          borderColor: "rgba(125, 211, 252, 0.5)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        {/* Glassmorphism card accent */}
                        <div className="absolute top-0 right-0 h-20 w-20 bg-primary-500/5 dark:bg-primary-500/10 rounded-bl-full rounded-tr-xl" />
                        
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 relative z-10 flex items-center">
                          <span>{exp.position}</span>
                          <span className="ml-2 px-2.5 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full">
                            {exp.type}
                          </span>
                        </h3>
                        
                        <div className="mt-2 flex items-center text-primary-600 dark:text-primary-400 text-sm relative z-10">
                          <FiBriefcase className="mr-2 flex-shrink-0" />
                          <p>{exp.company}</p>
                        </div>
                        
                        <div className="mt-1 flex items-start gap-2 text-gray-500 dark:text-gray-400 text-sm relative z-10">
                          <FiCalendar className="mt-0.5 flex-shrink-0" />
                          <p>{exp.period}</p>
                        </div>
                        
                        <div className="mt-1 flex items-start gap-2 text-gray-500 dark:text-gray-400 text-sm relative z-10">
                          <FiMapPin className="mt-0.5 flex-shrink-0" />
                          <p>{exp.location}</p>
                        </div>
                        
                        {/* Achievements/tasks with bullets */}
                        <ul className="mt-3 space-y-2 pl-5 list-disc text-gray-600 dark:text-gray-300 text-sm">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                        
                        {/* Technology tags */}
                        {exp.technologies && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {exp.technologies.map((tech, idx) => (
                              <span 
                                key={idx}
                                className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Animated underline on hover */}
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-300"
                          initial={{ width: "0%", left: "50%" }}
                          whileHover={{ width: "100%", left: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education section - keep existing */}
              <div className="mt-12 relative">
                <h3 className="text-xl font-semibold mb-10 flex items-center">
                  <span className="mr-2">{t('about.education')}</span>
                  <motion.div 
                    className="h-px bg-gradient-to-r from-primary-500 via-primary-300 to-transparent flex-grow ml-3" 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </h3>
                
                {/* Timeline connector */}
                <motion.div 
                  className="absolute left-0 top-10 bottom-20 w-[2px] bg-gradient-to-b from-primary-500 via-primary-300 to-transparent timeline-connector"
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ height: "100%", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                />
                
                {/* Education cards */}
                <div className="space-y-16 ml-6 relative">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, delay: index * 0.2 }}
                      className="relative timeline-item"
                    >
                      {/* Timeline node - consistent for all cards */}
                      <motion.div 
                        className="absolute -left-10 w-3.5 h-3.5 rounded-full bg-primary-500 border-4 border-white dark:border-dark-200 shadow-md"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.5, backgroundColor: "#0284c7" }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      />
                      
                      {/* Glow effect for the node - consistent for all */}
                      <div className="absolute -left-10 w-3.5 h-3.5 rounded-full bg-primary-400 opacity-40 blur-sm" />

                      {/* Education card - identical styling for all */}
                      <motion.div 
                        className="relative bg-white dark:bg-dark-100 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700/30"
                        whileHover={{ 
                          y: -5, 
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                          borderColor: "rgba(125, 211, 252, 0.5)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        {/* Glassmorphism card accent - identical for all cards */}
                        <div className="absolute top-0 right-0 h-20 w-20 bg-primary-500/5 dark:bg-primary-500/10 rounded-bl-full rounded-tr-xl" />
                        
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 relative z-10">
                          {edu.degree}
                        </h3>
                        
                        <div className="mt-2 flex items-center text-primary-600 dark:text-primary-400 text-sm relative z-10">
                          <FiMapPin className="mr-2" />
                          <p>{edu.university}</p>
                        </div>
                        
                        <div className="mt-1 flex items-center text-gray-500 dark:text-gray-400 text-sm relative z-10">
                          <FiCalendar className="mr-2" />
                          <p>{edu.period}</p>
                        </div>
                        
                        {/* Animated underline on hover - identical for all */}
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-300"
                          initial={{ width: "0%", left: "50%" }}
                          whileHover={{ width: "100%", left: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Interests section - keep existing */}
              <div className="mt-16">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <span className="mr-2">{t('about.interests')}</span>
                  <motion.div 
                    className="h-px bg-gradient-to-r from-primary-500 via-primary-300 to-transparent flex-grow ml-3" 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </h3>
                <motion.div 
                  className="flex flex-wrap gap-3"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {interests.map((interest, index) => (
                    <motion.div 
                      key={index} 
                      className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full text-sm shadow-md backdrop-blur-sm relative overflow-hidden group interest-item"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: '0 10px 15px -3px rgba(14, 165, 233, 0.3)'
                      }}
                    >
                      <span className="relative z-10">{interest}</span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Image section - keep existing */}
            <motion.div variants={itemVariants} className="relative" style={{ perspective: "1000px" }}>
              <div className="sticky top-24">                <motion.div 
                  ref={imageRef}
                  style={{ 
                    y: scrollEffects.y,
                    rotateY: scrollEffects.rotate,
                    scale: scrollEffects.scale
                  }}
                  className="relative h-80 rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:rotate-y-3 hover:scale-[1.02]"
                >
                  {/* Card frame with glassmorphism effect */}
                  <div className="absolute inset-0 border border-white/10 rounded-xl z-20 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent rounded-xl z-10 mix-blend-overlay" />
                  
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
                    alt="Coding"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  
                  <motion.div 

                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6"
                  >
                    <div className="text-white relative z-20">
                      <motion.div 
                        className="flex items-center gap-2 mb-4"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary-500/30 backdrop-blur-sm flex items-center justify-center">
                          <FiCode className="text-primary-300" />
                        </div>
                        <span className="font-medium">Software Engineer - GL</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center gap-2"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary-500/30 backdrop-blur-sm flex items-center justify-center">
                          <FiAward className="text-primary-300" />
                        </div>
                        <span>Problem Solver</span>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Highlight effect on hover */}
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-tr from-primary-500/10 to-transparent transition-opacity duration-500 pointer-events-none" />
                </motion.div>
                
                {/* 3D floating ornamental element */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 w-20 h-20 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg rotate-12 z-10"
                  style={{ 
                    transformStyle: "preserve-3d", 
                    transform: "rotateX(10deg) rotateY(10deg)" 
                  }}
                >
                  <div className="absolute inset-1 rounded-lg bg-white/10 backdrop-blur-sm" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>      {/* Orbit animation is handled by regular CSS in global styles */}
    </section>
  );
};

export default AboutSection;
