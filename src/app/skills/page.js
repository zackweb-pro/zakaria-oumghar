'use client';

import { motion } from 'framer-motion';
import SkillsSection from '../../components/SkillsSection';

export default function SkillsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SkillsSection />
    </motion.div>
  );
}
