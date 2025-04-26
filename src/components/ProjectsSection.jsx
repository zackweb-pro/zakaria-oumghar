import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import somap_image from '../assets/dashboardsomap.png';
import searchstage from '../assets/searchstage.jpeg';
import chatbot_ensias from '../assets/chatbot_ensias.png';
import formsaver_pro from '../assets/FormSaver Pro.png';

const ProjectsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

const projects = [
  {
    title: 'Gestion des Achats et Personnels',
    description: 'A web application for managing employee records and purchase requests, with admin and responsable roles, built during internship.',
    image: somap_image,
    tags: ['React.js', 'Tailwind CSS', 'Framer Motion', 'MySQL', 'Node.js', 'Express'],
    github: 'https://github.com/zackweb-pro/my-internship-project-1A',
    demo: '#',
  },
  {
    title: 'Etudiant Cherche Stage Platform',
    description: 'A platform connecting students with recruiters for internship applications, using Oracle DB on OCI, React, and Node.js.',
    image: searchstage,
    tags: ['React.js', 'Node.js', 'Oracle DB', 'OCI', 'Express'],
    github: 'https://github.com/zackweb-pro/SI_Interface',
    demo: '#',
  },
  {
    title: 'ENSIAS Chatbot',
    description: 'A chatbot web application for ENSIAS information retrieval, built with Python, Flask, NeuralIntents, and frontend technologies.',
    image: chatbot_ensias,
    tags: ['Python', 'Flask', 'NeuralIntents', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/zackweb-pro/PFA-FULL-EDITION',
    demo: '#',
  },
  {
    title: 'No Refill',
    description: 'A Chrome extension that stores user inputs so they persist even after a page reload.',
    image: formsaver_pro,
    tags: ['JavaScript', 'Chrome Extension', 'Local Storage', 'HTML', 'CSS'],
    github: 'https://github.com/zackweb-pro/No-ReFill',
    demo: '#',
  },
];


  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-200">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            {t('projects.title')}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="card overflow-hidden group"
              >
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <div className="flex gap-3">
                      <motion.a
                        href={project.github}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiGithub />
                      </motion.a>
                      {/* <motion.a
                        href={project.demo}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiExternalLink />
                      </motion.a> */}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 dark:bg-dark-300 rounded-md text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between">
                  {/* <motion.a
                    href={project.demo}
                    className="text-primary-500 font-medium text-sm hover:text-primary-600 transition-colors duration-300 flex items-center gap-1"
                    whileHover={{ x: 5 }}
                  >
                    {t('projects.viewProject')} <FiExternalLink />
                  </motion.a> */}
                  <motion.a
                    href={project.github}
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300 flex items-center gap-1"
                    whileHover={{ x: 5 }}
                  >
                    {t('projects.sourceCode')} <FiGithub />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            {/* <motion.a
              href="#"
              className="btn-primary inline-flex items-center gap-2 hover-trigger"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('projects.viewAll')} <FiExternalLink />
            </motion.a> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;