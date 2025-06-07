import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FiLayout, FiServer, FiTool,
  FiCode, FiGitBranch, FiPackage,
  FiDatabase, FiGlobe, FiMonitor,
  FiCoffee, FiLayers, FiZap, FiCloud
} from 'react-icons/fi';
import { useThrottledInView, optimizedViewport } from '../utils/animationUtils';

const SkillsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useThrottledInView(ref, { once: false });
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Get skill icons - unchanged
  const getSkillIcon = (skillName) => {
    const icons = {
      'HTML/CSS': <FiGlobe />,
      'JavaScript': <FiCode />,
      'React': <FiPackage />,
      'Next.js': <FiMonitor />,
      'Tailwind CSS': <FiLayout />,
      'Framer Motion': <FiLayout />,
      'Node.js': <FiServer />,
      'Express': <FiServer />,
      'MongoDB': <FiDatabase />,
      'MySQL': <FiDatabase />,
      'SQL': <FiDatabase />,
      'PostgreSQL': <FiDatabase />,
      'API Design': <FiGlobe />,
      'Microservices': <FiLayers />,
      'Java': <FiCoffee />,
      'Spring Boot': <FiZap />,
      'Firebase': <FiCloud />,
      'Git': <FiGitBranch />,
      'GitHub': <FiGitBranch />,
      'VS Code': <FiTool />,
      'Figma': <FiLayout />,
      'Docker': <FiPackage />,
    };
    
    return icons[skillName] || <FiCode />;
  };

  // Skill data - unchanged
  const skillCategories = [
    {
      title: t('skills.frontend'),
      icon: <FiLayout className="text-2xl" />,
      skills: [
        { name: 'HTML/CSS', level: 'Expert' },
        { name: 'JavaScript', level: 'Expert' },
        { name: 'React', level: 'Advanced' },
        { name: 'Next.js', level: 'Intermediate' },
        { name: 'Tailwind CSS', level: 'Advanced' },
        { name: 'Framer Motion', level: 'Advanced' },
        { name: '...and more', level: 'Various' },
      ],
      color: 'from-blue-500 to-cyan-400',
      accentColor: '#0ea5e9',
      gradientStart: '#3b82f6',
      gradientEnd: '#22d3ee',
      glowColor: 'rgba(14, 165, 233, 0.3)',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      title: t('skills.backend'),
      icon: <FiServer className="text-2xl" />,
      skills: [
        { name: 'Node.js', level: 'Advanced' },
        { name: 'Java', level: 'Intermediate' },
        { name: 'Spring Boot', level: 'Intermediate' },
        { name: 'Express', level: 'Advanced' },
        { name: 'MongoDB', level: 'Advanced' },
        { name: 'Firebase', level: 'Advanced' },
        { name: 'PostgreSQL', level: 'Advanced' },
        { name: 'Microservices', level: 'Intermediate' },
        { name: '...and more', level: 'Various' },
      ],
      color: 'from-green-500 to-emerald-400',
      accentColor: '#10b981',
      gradientStart: '#22c55e',
      gradientEnd: '#34d399',
      glowColor: 'rgba(16, 185, 129, 0.3)',
      iconBg: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
    {
      title: t('skills.tools'),
      icon: <FiTool className="text-2xl" />,
      skills: [
        { name: 'Git', level: 'Advanced' },
        { name: 'GitHub', level: 'Advanced' },
        { name: 'VS Code', level: 'Expert' },
        { name: 'Docker', level: 'Intermediate' },
        { name: 'Figma', level: 'Advanced' },
        { name: '...and more', level: 'Various' },
      ],
      color: 'from-purple-500 to-indigo-400',
      accentColor: '#8b5cf6',
      gradientStart: '#a855f7',
      gradientEnd: '#818cf8',
      glowColor: 'rgba(139, 92, 246, 0.3)',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
  ];

  // New improved skill card without glitchy 3D effects
  const SkillCard = ({ category, index }) => {
    // Level badge color styling - unchanged
    const getLevelColor = (level) => {
      switch(level) {
        case 'Expert':
          return {
            background: `linear-gradient(135deg, ${category.gradientStart}, ${category.gradientEnd})`,
            boxShadow: `0 4px 10px ${category.glowColor}`
          };
        case 'Advanced':
          return {
            background: `linear-gradient(135deg, ${category.gradientEnd}, ${category.accentColor})`,
            boxShadow: `0 4px 8px ${category.glowColor}`
          };
        case 'Various':
          return {
            background: `linear-gradient(135deg, #6366f1, #8b5cf6)`,
            boxShadow: '0 4px 8px rgba(99, 102, 241, 0.3)'
          };
        default:
          return {
            background: `linear-gradient(135deg, #f472b6, #f87171)`,
            boxShadow: '0 4px 8px rgba(244, 114, 182, 0.3)'
          };
      }
    };
    
    return (
      <motion.div
        variants={itemVariants}
        className="group relative overflow-hidden rounded-xl"        initial="hidden"
        whileInView="visible"
        viewport={optimizedViewport}
      >
        {/* Card Background with smooth gradient */}
        <motion.div 
          className="absolute inset-0 opacity-30 rounded-xl"
          style={{
            background: `linear-gradient(45deg, ${category.gradientStart}30, ${category.gradientEnd}30)`,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: "linear"
          }}
        />

        {/* Actual Card Content */}
        <motion.div
          className="relative z-10 bg-white/80 dark:bg-dark-100/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800/50 h-full"
          whileHover={{ 
            y: -8, 
            boxShadow: `0 25px 50px -12px ${category.glowColor}`
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Decorative elements */}
          <div 
            className="absolute top-0 right-0 w-28 h-28 rounded-bl-full opacity-10"
            style={{ background: `linear-gradient(to bottom left, ${category.gradientStart}, transparent)` }} 
          />

          <div 
            className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-5"
            style={{ background: `radial-gradient(circle, ${category.gradientEnd}, transparent)` }} 
          />

          {/* Card header */}
          <motion.div 
            className="flex items-center gap-4 mb-8 relative"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div 
              className={`p-3 rounded-lg ${category.iconBg}`}
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {category.icon}
            </motion.div>
            <h3 className="text-xl font-semibold">{category.title}</h3>
          </motion.div>

          {/* Skills list */}
          <div className="space-y-3.5">
            {category.skills.map((skill, skillIndex) => (
              <motion.div 
                key={skillIndex}
                className={`flex justify-between items-center p-2.5 rounded-lg hover:bg-gray-50/80 dark:hover:bg-gray-800/20 transition-colors duration-200 relative overflow-hidden ${
                  skill.name === '...and more' ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20' : ''
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.1 * skillIndex, duration: 0.4 }
                }}
                viewport={optimizedViewport}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* Skill info with icon */}
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${category.gradientStart}30, ${category.gradientEnd}40)`,
                      color: category.accentColor,
                    }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {getSkillIcon(skill.name)}
                  </motion.div>
                  <span className={`text-sm font-medium dark:text-gray-200 ${skill.name === '...and more' ? 'italic' : ''}`}>
                    {skill.name}
                  </span>
                </div>
                
                {/* Animated skill level badge */}
                <AnimatePresence>
                  <motion.div
                    className="px-3 py-1 text-xs font-semibold rounded-full shadow-sm text-white relative overflow-hidden"
                    style={getLevelColor(skill.level)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    initial={{ scale: 0.9, opacity: 0.9 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <span className="relative z-10">{skill.level}</span>
                    {/* Subtle shine effect */}
                    <motion.div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        backgroundSize: '200% 100%',
                      }}
                      animate={{
                        backgroundPosition: ['200% 0%', '0% 0%', '-200% 0%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        repeatDelay: 1
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          {/* Bottom accent line */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ 
              background: `linear-gradient(to right, ${category.gradientStart}, ${category.gradientEnd})`,
              transformOrigin: 'left'
            }}            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={optimizedViewport}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Optimized background particles with reduced count */}
      <div className="absolute inset-0 opacity-25 dark:opacity-30 overflow-hidden">
        {/* Reduced from 20 to 10 particles for better performance */}
        {[...Array(10)].map((_, i) => {
          // Create a grid layout for more efficient positioning
          const positions = [
            {x: 10, y: 10}, {x: 30, y: 20}, {x: 50, y: 15}, {x: 70, y: 25}, {x: 90, y: 10},
            {x: 15, y: 80}, {x: 35, y: 60}, {x: 55, y: 70}, {x: 75, y: 50}, {x: 85, y: 90}
          ];
          
          // Fixed sizes for better performance
          const sizes = [2, 3, 4, 3, 2, 4, 3, 2, 4, 3];
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500"
              style={{
                left: `${positions[i].x}%`,
                top: `${positions[i].y}%`,
                width: sizes[i],
                height: sizes[i],
                filter: "blur(0.5px)",
                boxShadow: "0 0 8px 0 rgba(59, 130, 246, 0.3)"
              }}
              animate={{
                x: [0, (i % 2 === 0) ? 25 : -25], // Simpler animation paths
                y: [0, (i % 3 === 0) ? -20 : 20],
                opacity: [0.2, 0.5, 0.2], // Reduced opacity range
              }}
              transition={{
                duration: 12 + (i * 2), // Between 12-30s
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear" // More efficient than easeInOut
              }}
            />
          );
        })}
      </div>

      {/* Mesh gradient background like in other sections */}
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

      {/* Grid pattern like in other sections */}
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

      {/* Keep your existing animated background blurs */}      <motion.div 
        className="absolute top-40 left-20 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{ 
          x: [0, 10, 0], // Reduced movement range
          y: [0, -15, 0], // Reduced movement range
          scale: [1, 1.05, 1] // Reduced scaling for better performance
        }}
        transition={{ 
          duration: 20, // Longer duration means less frequent updates
          repeat: Infinity, 
          ease: "linear" // Linear easing is less resource-intensive
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{ 
          x: [0, -15, 0], // Reduced movement range
          y: [0, 10, 0], // Reduced movement range
          scale: [1, 1.07, 1] // Reduced scaling
        }}
        transition={{ 
          duration: 25, // Longer duration for less frequent renders
          repeat: Infinity, 
          ease: "linear" // More efficient easing function
        }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-display font-bold text-center mb-16 relative"
          >
            {t('skills.title')}
            <motion.div 
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 via-primary-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h2>

          {/* Skills grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <SkillCard key={index} category={category} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
