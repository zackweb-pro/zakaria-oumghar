import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FiCode, FiDatabase, FiTool, 
  FiLayout, FiServer, FiGitBranch 
} from 'react-icons/fi';

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

  const skillCategories = [
    {
      title: t('skills.frontend'),
      icon: <FiLayout className="text-2xl" />,
      skills: [
        { name: 'HTML/CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'React', level: 80 },
        { name: 'Next.js', level: 60 },
        { name: 'Tailwind CSS', level: 80 },
        { name: 'Framer Motion', level: 75 },
      ],
      color: 'from-blue-500 to-cyan-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      title: t('skills.backend'),
      icon: <FiServer className="text-2xl" />,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'MySQL', level: 80 },
        { name: 'SQL', level: 80 },
        { name: 'API Design', level: 85 },
      ],
      color: 'from-green-500 to-emerald-400',
      iconBg: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
    {
      title: t('skills.tools'),
      icon: <FiTool className="text-2xl" />,
      skills: [
        { name: 'Git', level: 90 },
        { name: 'GitHub', level: 85 },
        { name: 'VS Code', level: 95 },
        { name: 'Figma', level: 75 },
        { name: 'Docker', level: 60 },
       
      ],
      color: 'from-purple-500 to-indigo-400',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            {t('skills.title')}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${category.iconBg}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-dark-300 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: isInView ? `${skill.level}%` : 0 }}
                          transition={{ duration: 1, delay: 0.3 + skillIndex * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {['JavaScript', 'React', 'Next.js', 'Node.js', 'HTML5', 'CSS3', 'Tailwind', 'Git', 'GitHub', 'MongoDB', 'MySQL', 'Express', 'REST API', 'Figma', 'Docker', 'SQL', "C/C++", "Java", 'Software Engineering'].map((tag, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-gray-100 dark:bg-dark-300 rounded-full text-sm font-medium"
                  whileHover={{ scale: 1.05, backgroundColor: '#0ea5e9', color: '#ffffff' }}
                  transition={{ duration: 0.2 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
