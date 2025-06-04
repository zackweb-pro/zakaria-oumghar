import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LocomotiveScroll from 'locomotive-scroll';
import { useTranslation } from 'react-i18next';
import 'locomotive-scroll/dist/locomotive-scroll.css';

// Components
// import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

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
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;
