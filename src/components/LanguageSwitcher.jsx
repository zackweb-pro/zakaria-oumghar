'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

  useEffect(() => {
    // Update current language when i18n language changes
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    setIsOpen(false);
  };

  const currentLanguage = currentLang === 'fr' ? 'FR' : 'EN';

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-dark-200 text-sm font-medium hover-trigger"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {currentLanguage}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-white dark:bg-dark-200 rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="flex flex-col w-24">
              <button
                onClick={() => toggleLanguage('en')}
                className={`px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors duration-200 ${
                  currentLang === 'en' ? 'text-primary-500 font-medium' : ''
                }`}
              >
                English
              </button>
              <button
                onClick={() => toggleLanguage('fr')}
                className={`px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors duration-200 ${
                  currentLang === 'fr' ? 'text-primary-500 font-medium' : ''
                }`}
              >
                Français
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;