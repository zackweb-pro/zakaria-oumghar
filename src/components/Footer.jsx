import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiArrowUp, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-dark-200 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-display font-bold">
              <span className="gradient-text">ZACKWEB</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {t('footer.madeWith')} <FiHeart className="inline text-red-500" />
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <motion.a
              href="#home"
              className="p-3 bg-white dark:bg-dark-100 rounded-full shadow-md mb-4 hover-trigger"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowUp className="text-primary-500" />
            </motion.a>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              &copy; {currentYear} Zakaria Oumghar. {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;