'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FiLayout, FiServer, FiTool,
  FiCode, FiGitBranch, FiPackage,
  FiDatabase, FiGlobe, FiMonitor,
  FiCoffee, FiLayers, FiZap, FiCloud
} from 'react-icons/fi';

const SkillsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);

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

  // New simplified skill card without problematic animations
  const SkillCard = ({ category }) => {
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
      <div className="group relative overflow-hidden rounded-xl">
        {/* Card Background with simple gradient */}
        <div 
          className="absolute inset-0 opacity-30 rounded-xl"
          style={{
            background: `linear-gradient(45deg, ${category.gradientStart}30, ${category.gradientEnd}30)`,
          }}
        />

        {/* Actual Card Content */}
        <div className="relative z-10 bg-white/80 dark:bg-dark-100/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800/50 h-full hover:shadow-xl transition-shadow duration-300">
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
          <div className="flex items-center gap-4 mb-8 relative">
            <div className={`p-3 rounded-lg ${category.iconBg}`}>
              {category.icon}
            </div>
            <h3 className="text-xl font-semibold">{category.title}</h3>
          </div>

          {/* Skills list */}
          <div className="space-y-3.5">
            {category.skills.map((skill, skillIndex) => (
              <div 
                key={skillIndex}
                className={`flex justify-between items-center p-2.5 rounded-lg hover:bg-gray-50/80 dark:hover:bg-gray-800/20 transition-colors duration-200 relative overflow-hidden ${
                  skill.name === '...and more' ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20' : ''
                }`}
              >
                {/* Skill info with icon */}
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${category.gradientStart}30, ${category.gradientEnd}40)`,
                      color: category.accentColor,
                    }}
                  >
                    {getSkillIcon(skill.name)}
                  </div>
                  <span className={`text-sm font-medium dark:text-gray-200 ${skill.name === '...and more' ? 'italic' : ''}`}>
                    {skill.name}
                  </span>
                </div>
                
                {/* Simple skill level badge */}
                <div
                  className="px-3 py-1 text-xs font-semibold rounded-full shadow-sm text-white"
                  style={getLevelColor(skill.level)}
                >
                  <span>{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom accent line */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ 
              background: `linear-gradient(to right, ${category.gradientStart}, ${category.gradientEnd})`,
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Mesh gradient background like in other sections */}
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

      {/* Grid pattern like in other sections */}
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
        <div ref={ref} className="max-w-5xl mx-auto">
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-display font-bold relative">
              {t('skills.title')}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 via-primary-500 to-purple-500 rounded-full w-[120px]" />
            </h2>
          </div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <SkillCard key={index} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
