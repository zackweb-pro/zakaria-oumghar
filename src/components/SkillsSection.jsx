import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FiLayout, FiServer, FiTool,
  FiCode, FiGitBranch, FiPackage,
  FiDatabase, FiGlobe, FiMonitor,
  FiCoffee, FiLayers, FiZap, FiCloud
} from 'react-icons/fi';
import { useEffect } from 'react';

const SkillsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  // Get skill icons - now with additional skills
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

  // Enhanced skill data with expanded backend section
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
        { name: 'Java', level: 'Advanced' },
        { name: 'Spring Boot', level: 'Advanced' },
        { name: 'Microservices', level: 'Intermediate' },
        { name: 'Express', level: 'Advanced' },
        { name: 'MongoDB', level: 'Advanced' },
        { name: 'PostgreSQL', level: 'Advanced' },
        { name: 'Firebase', level: 'Intermediate' },
        { name: 'API Design', level: 'Advanced' },
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
        { name: 'Git', level: 'Expert' },
        { name: 'GitHub', level: 'Advanced' },
        { name: 'VS Code', level: 'Expert' },
        { name: 'Docker', level: 'Intermediate' },
        { name: 'Figma', level: 'Advanced' },
      ],
      color: 'from-purple-500 to-indigo-400',
      accentColor: '#8b5cf6',
      gradientStart: '#a855f7',
      gradientEnd: '#818cf8',
      glowColor: 'rgba(139, 92, 246, 0.3)',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
  ];

  // 3D tilt card effect
  const SkillCard = ({ category, index }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);
    
    // Light reflection effect
    const lightX = useTransform(x, [-100, 100], [-25, 25], { clamp: false });
    const lightY = useTransform(y, [-100, 100], [-25, 25], { clamp: false });
    
    const handleMouseMove = (event) => {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Map values relative to card center
      x.set(event.clientX - centerX);
      y.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
      // Animate back to flat position
      x.set(0);
      y.set(0);
    };

    // Level badge color styling
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
        ref={cardRef}
        variants={itemVariants}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000
        }}
        className="bg-white dark:bg-dark-100 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800/50 relative overflow-hidden group h-full"
        whileHover={{ translateY: -8 }}
      >
        {/* 3D card decoration */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${lightX.get()}% ${lightY.get()}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        />
        
        {/* Floating decorative elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-24 h-24 rounded-full"
          style={{
            background: `radial-gradient(circle, ${category.accentColor}20, transparent 70%)`,
            translateZ: 20,
          }}
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full"
          style={{
            background: `radial-gradient(circle, ${category.accentColor}10, transparent 70%)`,
            translateZ: 20,
          }}
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Card header with 3D effect */}
        <motion.div 
          className="flex items-center gap-4 mb-6 relative"
          style={{ translateZ: 40 }}
        >
          <motion.div 
            className={`p-3 rounded-lg ${category.iconBg} backdrop-blur-sm`}
            whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
          >
            {category.icon}
          </motion.div>
          <h3 className="text-xl font-semibold">{category.title}</h3>
        </motion.div>

        {/* Skills list with 3D effect */}
        <motion.div 
          className="space-y-4"
          style={{ translateZ: 30 }}
        >
          {category.skills.map((skill, skillIndex) => (
            <motion.div 
              key={skillIndex}
              className={`flex justify-between items-center p-3 rounded-lg backdrop-blur-sm border border-transparent dark:border-gray-800/20 relative overflow-hidden ${skill.name === '...and more' ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20' : ''}`}
              style={{
                background: skill.name === '...and more' ? 'none' : `none`,
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)'
              }}
              whileHover={{ 
                scale: 1.02, 
                translateX: 5,
                borderColor: category.accentColor,
                transition: { duration: 0.2 }
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, delay: 0.1 * skillIndex }
              }}
              viewport={{ once: true }}
            >
              {/* Skill info with icon */}
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${category.gradientStart}30, ${category.gradientEnd}30)`,
                    color: category.accentColor,
                  }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {getSkillIcon(skill.name)}
                </motion.div>
                <span className={`text-sm font-medium dark:text-gray-200 ${skill.name === '...and more' ? 'italic' : ''}`}>
                  {skill.name}
                </span>
              </div>
              
              {/* Skill level badge */}
              <motion.div
                className="px-3 py-1 text-xs font-semibold rounded-full shadow-sm text-white relative overflow-hidden"
                style={getLevelColor(skill.level)}
                whileHover={{ scale: 1.08, y: -1 }}
              >
                <span className="relative z-10">{skill.level}</span>
                {/* Animated gradient movement */}
                <motion.div 
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)`,
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['100% 0%', '0% 0%', '100% 0%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Card background accent */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r"
          style={{ background: `linear-gradient(to right, ${category.gradientStart}, ${category.gradientEnd})` }}
        />
        
        {/* Hover card glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-500"
          style={{ 
            boxShadow: `0 0 30px ${category.glowColor}`,
            borderRadius: 'inherit'
          }}
        />
      </motion.div>
    );
  };

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
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

          {/* 3D grid with perspective */}
          <div className="grid md:grid-cols-3 gap-10" style={{ perspective: '1000px' }}>
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
