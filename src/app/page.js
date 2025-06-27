'use client';

import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
    </motion.div>
  );
}
