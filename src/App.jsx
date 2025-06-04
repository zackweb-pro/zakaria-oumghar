import { useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import LocomotiveScroll from 'locomotive-scroll';
import { useTranslation } from 'react-i18next';
import 'locomotive-scroll/dist/locomotive-scroll.css';

// Components
// import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
// Only HeroSection loads immediately
import HeroSection from './components/HeroSection';

// Lazy load other sections
const AboutSection = lazy(() => import('./components/AboutSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const { i18n } = useTranslation();
  const scrollRef = useRef(null);
  const scrollInstance = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollInstance.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    console.log("Locomotive Scroll initialized:", scrollInstance.current);

    return () => {
      if (scrollInstance.current) {
        scrollInstance.current.destroy();
        scrollInstance.current = null;
      }
    };
  }, []);

  // ✅ Update scroll correctly using the new method
  useEffect(() => {
    if (scrollInstance.current && scrollInstance.current.lenisInstance) {
      setTimeout(() => {
        scrollInstance.current.lenisInstance.resize(); // ✅ Use resize() instead of update()
      }, 100);
    } else {
      console.warn("Locomotive Scroll (Lenis) is not initialized yet.");
    }
  }, [i18n.language]);

  return (
    <div className="App">
      {/* <CustomCursor /> */}
      <Navbar />

      <motion.div
        ref={scrollRef}
        data-scroll-container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <Suspense fallback={<div className="section-padding bg-gray-50 dark:bg-dark-200"></div>}>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </Suspense>
      </motion.div>
    </div>
  );
}

export default App;
