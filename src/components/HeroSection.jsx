import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import profile from "../assets/portfolio-image.jpeg"
import { WiDayThunderstorm } from 'react-icons/wi';
const HeroSection = () => {
  const { t } = useTranslation();
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      if (imageRef.current && textRef.current) {
        const scrollPosition = window.scrollY;
        gsap.to(imageRef.current, {
          y: scrollPosition * 0.1,
          duration: 0.5,
          ease: 'power1.out'
        });
        
        gsap.to(textRef.current, {
          y: -scrollPosition * 0.05,
          duration: 0.5,
          ease: 'power1.out'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <motion.div
          ref={textRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="order-2 md:order-1"
        >
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-primary-500 font-medium mb-2">
            {t('hero.greeting')}
          </motion.p>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-display font-bold mb-4">
            Zakaria Oumghar
          </motion.h1>
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl gradient-text font-display font-bold mb-6">
            {t('hero.title')}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
            {t('hero.description')}
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
          <motion.a
            href={t('hero.cv')}
            className="btn-primary hover-trigger"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            download
          >
            {t('hero.cta')}
          </motion.a>

            <motion.a
              href="#projects"
              className="btn-outline hover-trigger"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('projects.viewAll')}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          ref={imageRef}
          className="order-1 md:order-2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        >
          <div className="relative">
            {/* Replace with your actual image */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-dark-200">
                <img
                  src={profile}
                  alt="Zakaria Oumghar"
                  className="w-full object-cover"
                  style={{
                
                   
                  }}
                />
              </div>
            </div>
            
            {/* Floating elements */}


            <motion.div
              className="absolute -top-4 -right-4 p-2 h-16 bg-white dark:bg-dark-200 rounded-lg shadow-lg flex items-center justify-center "
              style={{flexDirection: "column"}}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
                <motion.p variants={itemVariants} className="text-l md:text-sm text-primary-500 font-medium mb-2 " >
            {t('hero.exp')}
          </motion.p>
          <motion.p variants={itemVariants} className="text-base md:text-sm text-gray-600 dark:text-gray-300" >
            {t('hero.field_exp')}
          </motion.p>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-white dark:bg-dark-200 rounded-lg shadow-lg flex items-center justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
            >
              <span className="text-2xl">👨‍💻</span>
              {/* <span className="text-2xl">🚀</span> */}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;