'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiCode, FiArrowRight } from 'react-icons/fi';
import { useThrottledInView, optimizedViewport } from '../utils/animationUtils'; 

const ProjectsSection = () => {  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useThrottledInView(ref, { once: false });
  const [activeIndex, setActiveIndex] = useState(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
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

  const projects = [
    {
      title: 'OurBusWay — Urban Transportation Digitalization Platform',
      description: 'Comprehensive urban transportation management platform enabling ticket purchase, subscription management, real-time bus tracking, incident management and multi-user dashboards.',
      image: '/assets/ourbusway.png',
      tags: ['Spring Boot', 'Spring Cloud', 'PostgreSQL', 'RabbitMQ', 'React', 'TypeScript', 'Stripe API', 'Consul', 'Docker', 'JWT'],
      github: '#',
      demo: '#',
      color: 'from-sky-500/20 to-blue-400/20',
      accent: '#A54033'
    },
    {
      title: 'Management of department in ENSIAS',
      description: 'A web application for managing the departments of ENSIAS and displaying them in a more esthitique astonishing way.',
      image: '/assets/dep_manage.png',
      tags: ['Spring Boot', 'React.js', "microservices", "docker", "github actions", 'Postgresql', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Express'],
      github: 'https://github.com/zackweb-pro/department-management-ensias',
      demo: '#',
      color: 'from-red-500/20 to-yellow-400/20',
      accent: '#ec3636'
    },
    {
      title: 'Management of Employee Records and Purchase Requests',
      description: 'A web application for managing employee records and purchase requests, with admin and responsable roles, built during internship.',
      image: '/assets/dashboardsomap.png',
      tags: ['React.js', 'Tailwind CSS', 'Framer Motion', 'MySQL', 'Node.js', 'Express'],
      github: 'https://github.com/zackweb-pro/my-internship-project-1A',
      demo: '#',
      color: 'from-blue-500/20 to-cyan-400/20',
      accent: '#0ea5e9'
    },
    {
      title: 'Student Interface for Internship Applications',
      description: 'A platform connecting students with recruiters for internship applications, using Oracle DB on OCI, React, and Node.js.',
      image: '/assets/searchstage.jpeg',
      tags: ['React.js', 'Node.js', 'Oracle DB', 'OCI', 'Express'],
      github: 'https://github.com/zackweb-pro/SI_Interface',
      demo: '#',
      color: 'from-emerald-500/20 to-green-400/20',
      accent: '#10b981'
    },
    {
      title: 'ENSIAS Chatbot',
      description: 'A chatbot web application for ENSIAS information retrieval, built with Python, Flask, NeuralIntents, and frontend technologies.',
      image: '/assets/chatbot_ensias.png',
      tags: ['Python', 'Flask', 'NeuralIntents', 'HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/zackweb-pro/PFA-FULL-EDITION',
      demo: '#',
      color: 'from-purple-500/20 to-indigo-400/20',
      accent: '#8b5cf6'
    },
    {
      title: 'Form Saver Pro',
      description: 'A Chrome extension that stores user inputs so they persist even after a page reload.',
      image: '/assets/FormSaver Pro.png',
      tags: ['JavaScript', 'Chrome Extension', 'Local Storage', 'HTML', 'CSS'],
      github: 'https://github.com/zackweb-pro/No-ReFill',
      demo: '#',
      color: 'from-amber-500/20 to-orange-400/20',
      accent: '#f59e0b'
    },
  ];

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-200 relative overflow-hidden">
      {/* Mesh gradient background like in Hero Section */}
      {/* <motion.div 
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
      /> */}

      {/* Grid pattern like in Hero Section */}
      {/* <div className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.07) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(99, 102, 241, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.5
        }}
      /> */}

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Enhanced section title */}
          <motion.div variants={itemVariants} className="text-center relative mb-14">
            <motion.span              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={optimizedViewport}
              className="text-sm text-primary-500 font-medium block mb-2"
            >
              {t('projects.showcase', 'SHOWCASE')}
            </motion.span>
            
            <motion.h2 className="text-3xl md:text-4xl font-display font-bold inline-block relative">
              {t('projects.title')}
              <motion.div 
                className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={optimizedViewport}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-dark-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 group relative"
                onHoverStart={() => setActiveIndex(index)}
                onHoverEnd={() => setActiveIndex(null)}
                whileHover={{ y: -8 }}
              >
                {/* Card top border glow effect */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r z-10"
                  style={{ 
                    backgroundImage: `linear-gradient(to right, ${project.accent}, ${project.accent}88)` 
                  }}                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={optimizedViewport}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                />
                
                {/* Card inner glow effect on hover */}
                <motion.div
                  className={`absolute inset-0 opacity-0 bg-gradient-to-br ${project.color} pointer-events-none rounded-xl`}
                  animate={{ 
                    opacity: activeIndex === index ? 0.5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Image container with enhanced hover effects */}
                <div className="relative h-48 overflow-hidden">
                  {/* Image-specific glass blur overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backdropFilter: "blur(0px)" }}
                    whileHover={{ backdropFilter: "blur(2px)" }}
                  />
                  
                  {/* Project primary language badge */}
                  <motion.div
                    className="absolute top-3 right-3 z-20 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5"
                    initial={{ y: -20, opacity: 0 }}                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={optimizedViewport}
                    transition={{ delay: 0.15 + index * 0.08 }}
                  >
                    <FiCode className="text-primary-300" />
                    <span>{project.tags[0]}</span>
                  </motion.div>
                  
                  {/* Project image with smooth zoom */}
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    loading='lazy'
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  
                  {/* Subtle shine effect across image on hover */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/20 to-transparent z-10 pointer-events-none"
                    animate={{ 
                      left: activeIndex === index ? ['100%', '-100%'] : '100%'
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  />
                  
                  {/* GitHub link overlay */}
                  <div className="absolute inset-0 z-10 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.a
                      href={project.github}
                      className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiGithub className="text-lg" />
                    </motion.a>
                  </div>
                </div>
                
                {/* Content area */}
                <div className="p-5 relative">
                  {/* Title with animated underline on hover */}
                  <div className="relative mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <motion.div 
                      className="h-0.5 bg-gradient-to-r w-0"
                      style={{ 
                        backgroundImage: `linear-gradient(to right, ${project.accent}99, transparent)` 
                      }}
                      animate={{ width: activeIndex === index ? '40%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Enhanced Tags Section with Advanced Effects */}
                  <div className="mb-5 relative">
                    <div className="flex flex-wrap gap-2 relative">
                      {project.tags.slice(0, 4).map((tag, tagIndex) => (
                        <motion.div
                          key={tagIndex}
                          className="relative group/tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ 
                            opacity: 1, 
                            scale: 1,                            transition: { 
                              delay: 0.15 + (index * 0.05) + (tagIndex * 0.03),
                              type: 'spring',
                              stiffness: 300,
                              damping: 20
                            }
                          }}
                          viewport={optimizedViewport}
                        >
                          {/* Background glow effect on hover */}
                          <motion.div
                            className="absolute inset-0 rounded-md opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300"
                            style={{ 
                              boxShadow: `0 0 12px ${project.accent}60`,
                              background: `radial-gradient(circle at center, ${project.accent}30, transparent 70%)` 
                            }}
                          />
                          
                          {/* Tag content with subtle border */}
                          <motion.span
                            className={`px-3 py-1.5 rounded-md text-xs font-medium border border-transparent inline-flex items-center gap-1.5 relative z-10 ${
                              tagIndex === 0 ? `bg-gradient-to-r ${project.color} dark:bg-opacity-30` : 'bg-gray-100/80 dark:bg-dark-300/80 backdrop-blur-sm'
                            }`}
                            whileHover={{ 
                              y: -3, 
                              x: 2,
                              borderColor: `${project.accent}40`,
                            }}
                            transition={{ 
                              type: 'spring', 
                              stiffness: 500,
                              damping: 15
                            }}
                          >
                            {/* Conditional icon for primary tag */}
                            {tagIndex === 0 && (
                              <motion.span 
                                initial={{ rotate: 0 }}
                                whileHover={{ rotate: 15 }}
                                className="text-xs opacity-80"
                              >
                                <FiCode />
                              </motion.span>
                            )}
                            
                            {/* Tag text with shine effect on hover */}
                            <span className="relative overflow-hidden">
                              {tag}
                              <motion.span
                                className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r"
                                style={{ backgroundImage: `linear-gradient(to right, transparent, ${project.accent}, transparent)` }}
                                initial={{ x: '-100%', opacity: 0.5 }}
                                whileHover={{ x: '100%', opacity: 0.8 }}
                                transition={{ duration: 0.6 }}
                              />
                            </span>
                          </motion.span>
                        </motion.div>
                      ))}
                      
                      {/* Enhanced "+more" tag with tooltip */}
                      {project.tags.length > 4 && (
                        <motion.div
                          className="relative group/more"
                          initial={{ opacity: 0, scale: 0.8 }}                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={optimizedViewport}
                          transition={{ 
                            delay: 0.15 + (index * 0.05) + (4 * 0.03),
                            type: 'spring',
                            stiffness: 300,
                            damping: 20
                          }}
                        >
                          <motion.span
                            className="px-3 py-1.5 bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-300 rounded-md text-xs font-medium border border-transparent cursor-pointer flex items-center gap-1"
                            whileHover={{ 
                              y: -3, 
                              x: 2,
                              borderColor: `${project.accent}40`,
                            }}
                            transition={{ 
                              type: 'spring', 
                              stiffness: 500, 
                              damping: 15
                            }}
                          >
                            +{project.tags.length - 4}
                            <motion.span 
                              animate={{ y: [0, -2, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="text-xs"
                            >
                              ✨
                            </motion.span>
                          </motion.span>
                          
                          {/* Hidden tags tooltip on hover */}
                          <motion.div
                            className="absolute bottom-full left-0 mb-2 bg-white dark:bg-dark-100 rounded-lg shadow-lg p-2 z-50 min-w-[140px] origin-bottom-left pointer-events-none opacity-0 group-hover/more:opacity-100 transition-opacity duration-300"
                            initial={{ scale: 0.9, y: 10 }}
                            whileInView={{ scale: 1, y: 0 }}
                            style={{ boxShadow: `0 10px 25px -5px ${project.accent}30` }}
                          >
                            <div className="flex flex-col gap-1.5">
                              {project.tags.slice(4).map((tag, moreTagIndex) => (
                                <motion.span 
                                  key={moreTagIndex}
                                  className="text-xs whitespace-nowrap px-2 py-1 rounded bg-gray-100/50 dark:bg-dark-300/50"
                                  initial={{ x: -5, opacity: 0 }}
                                  whileInView={{ x: 0, opacity: 1 }}
                                  transition={{ delay: moreTagIndex * 0.05 }}
                                >
                                  {tag}
                                </motion.span>
                              ))}
                            </div>
                            <div className="absolute top-full left-4 w-3 h-3 bg-white dark:bg-dark-100 transform rotate-45 -translate-y-1.5 z-0"></div>
                          </motion.div>
                        </motion.div>
                      )}
                    </div
                    >
                    
                    {/* Floating decorative dots pattern */}
                    <div className="absolute -right-2 -bottom-2 w-12 h-8 opacity-10 pointer-events-none">
                      <motion.div 
                        className="absolute w-1 h-1 rounded-full"
                        style={{ background: project.accent, top: '0px', left: '0px' }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                      />
                      <motion.div 
                        className="absolute w-1 h-1 rounded-full"
                        style={{ background: project.accent, top: '4px', left: '6px' }}
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                      />
                      <motion.div 
                        className="absolute w-1 h-1 rounded-full"
                        style={{ background: project.accent, top: '8px', left: '2px' }}
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
                      />
                    </div>
                  </div>
                  
                  {/* Source code link with animated arrow */}
                  <motion.div className="flex justify-between items-center">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium flex items-center gap-1.5 group/link"
                      whileHover={{ x: 3 }}
                    >
                      {t('projects.sourceCode')} 
                      <motion.span
                        initial={{ x: -5, opacity: 0 }}
                        animate={{ 
                          x: activeIndex === index ? 0 : -5,
                          opacity: activeIndex === index ? 1 : 0
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiArrowRight />
                      </motion.span>
                    </motion.a>
                  </motion.div>
                </div>
                
                {/* Corner accent decoration */}
                <div 
                  className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10"
                  style={{ background: `linear-gradient(to bottom left, ${project.accent}, transparent)` }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* GitHub profile link */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <motion.a
              href="https://github.com/zackweb-pro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block relative py-3 px-8 overflow-hidden rounded-full group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button background with animated gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                }}
                transition={{ 
                  duration: 5, 
                  ease: "easeInOut", 
                  repeat: Infinity 
                }}
              />
              
              {/* Button text with icon */}
              <span className="relative z-10 text-white font-medium flex items-center gap-2">
                {t('projects.viewMore', 'View More Projects')} 
                <FiGithub className="group-hover:rotate-12 transition-transform duration-300" />
              </span>
              
              {/* Button shine effect */}
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ 
                  left: ['-100%', '100%'] 
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;