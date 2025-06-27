'use client';

import { motion } from 'framer-motion';
import ProjectsSection from '../../components/ProjectsSection';

export default function ProjectsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProjectsSection />
    </motion.div>
  );
}
