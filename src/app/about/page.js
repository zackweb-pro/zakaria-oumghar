'use client';

import { motion } from 'framer-motion';
import AboutSection from '../../components/AboutSection';

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AboutSection />
    </motion.div>
  );
}
