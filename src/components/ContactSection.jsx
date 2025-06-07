import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheck, FiX, FiArrowRight } from 'react-icons/fi';
import { 
  FaGithub, 
  FaLinkedinIn, 
  FaInstagram 
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useThrottledInView, optimizedViewport } from '../utils/animationUtils';

const ContactSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const formRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const isInView = useThrottledInView(ref, { once: false });
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFocus, setActiveFocus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    try {
      await emailjs.sendForm(
        'service_x6g1c27',
        'template_y4vaxrf',
        formRef.current,
        'UAr9FrxM_siIucO4v'
      );
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send message:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail className="text-xl" />,
      title: 'Email',
      value: 'zakariaoumghar1@gmail.com',
      link: 'mailto:zakaria.oumghar1@gmail.com',
      color: 'from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-600 dark:text-blue-400',
      shadowColor: 'rgba(59, 130, 246, 0.3)',
    },
    {
      icon: <FiMapPin className="text-xl" />,
      title: 'Location',
      value: 'Morocco, Berrechid',
      link: '#',
      color: 'from-green-500 to-green-600 dark:from-green-400 dark:to-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-600 dark:text-green-400',
      shadowColor: 'rgba(16, 185, 129, 0.3)',
    },
    {
      icon: <FiPhone className="text-xl" />,
      title: 'Phone',
      value: '+212 619-665220',
      link: 'tel:+212619-665220',
      color: 'from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      textColor: 'text-purple-600 dark:text-purple-400',
      shadowColor: 'rgba(139, 92, 246, 0.3)',
    },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <FaGithub />, link: "https://github.com/zackweb-pro", color: 'from-gray-700 to-gray-800 dark:from-gray-500 dark:to-gray-300' },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/zakaria-oumghar-b30b9b1bb/", color: 'from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600' },
    { name: 'Instagram', icon: <FaInstagram />, link: "https://www.instagram.com/zakaria.oumghar/", color: 'from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500' }
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden py-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-16 w-64 h-64 rounded-full bg-gradient-to-r from-primary-500/20 to-purple-500/20 dark:from-primary-500/10 dark:to-purple-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-16 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 dark:from-blue-500/10 dark:to-green-500/10 blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px), 
              linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Decorative dots */}
        <div className="absolute left-1/4 top-20 w-40 h-40 opacity-20">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
        <div className="absolute right-1/4 bottom-20 w-40 h-40 opacity-30">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 20 - 10],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-5xl font-display font-bold text-center mb-4 relative inline-flex mx-auto"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-purple-600 dark:from-primary-400 dark:to-purple-500">
              {t('contact.title')}
            </span>
            <motion.span 
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary-500 to-purple-600 dark:from-primary-400 dark:to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 1 }}
            />
          </motion.h2>
          
          <motion.p 
            variants={itemVariants} 
            className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto text-lg"
          >
            {t('contact.description')}
          </motion.p>

          <div className="grid md:grid-cols-3 gap-10 relative z-10">
            {/* Enhanced form with glassmorphism and advanced animations */}
            <motion.div 
              variants={itemVariants} 
              className="md:col-span-2"
            >
              <motion.div
                className="rounded-2xl overflow-hidden bg-white/80 dark:bg-dark-200/80 backdrop-blur-lg shadow-xl border border-gray-100 dark:border-dark-300/50"
                whileHover={{ 
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"  
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="p-1">
                  <div className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 dark:from-primary-500/5 dark:to-purple-500/5 px-6 py-8 md:p-8 rounded-2xl relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-purple-600 opacity-70"></div>
                    
                    <form ref={formRef} onSubmit={handleSubmit}>
                      <div className="mb-8 relative">
                        <label 
                          htmlFor="name" 
                          className={`block text-sm font-medium mb-2 transition-all duration-200 ${
                            activeFocus === 'name' ? 'text-primary-500 dark:text-primary-400' : ''
                          }`}
                        >
                          {t('contact.nameLabel')}
                        </label>
                        <div className="relative">
                          <motion.input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setActiveFocus('name')}
                            onBlur={() => setActiveFocus(null)}
                            required
                            className="w-full px-5 py-4 rounded-xl border bg-white/50 dark:bg-dark-300/50 focus:outline-none transition-all duration-300"
                            style={{ 
                              borderColor: activeFocus === 'name' ? 'rgba(79, 70, 229, 0.6)' : 'rgba(209, 213, 219, 0.4)'
                            }}
                            whileFocus={{ boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.2)" }}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                          />
                          {activeFocus === 'name' && (
                            <motion.div 
                              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600"
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </div>
                      </div>

                      <div className="mb-8 relative">
                        <label 
                          htmlFor="email" 
                          className={`block text-sm font-medium mb-2 transition-all duration-200 ${
                            activeFocus === 'email' ? 'text-primary-500 dark:text-primary-400' : ''
                          }`}
                        >
                          {t('contact.emailLabel')}
                        </label>
                        <div className="relative">
                          <motion.input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setActiveFocus('email')}
                            onBlur={() => setActiveFocus(null)}
                            required
                            className="w-full px-5 py-4 rounded-xl border bg-white/50 dark:bg-dark-300/50 focus:outline-none transition-all duration-300"
                            style={{ 
                              borderColor: activeFocus === 'email' ? 'rgba(79, 70, 229, 0.6)' : 'rgba(209, 213, 219, 0.4)'
                            }}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                          />
                          {activeFocus === 'email' && (
                            <motion.div 
                              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600"
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </div>
                      </div>

                      <div className="mb-8 relative">
                        <label 
                          htmlFor="message" 
                          className={`block text-sm font-medium mb-2 transition-all duration-200 ${
                            activeFocus === 'message' ? 'text-primary-500 dark:text-primary-400' : ''
                          }`}
                        >
                          {t('contact.messageLabel')}
                        </label>
                        <div className="relative">
                          <motion.textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setActiveFocus('message')}
                            onBlur={() => setActiveFocus(null)}
                            required
                            rows="5"
                            className="w-full px-5 py-4 rounded-xl border bg-white/50 dark:bg-dark-300/50 focus:outline-none transition-all duration-300"
                            style={{ 
                              borderColor: activeFocus === 'message' ? 'rgba(79, 70, 229, 0.6)' : 'rgba(209, 213, 219, 0.4)'
                            }}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          />
                          {activeFocus === 'message' && (
                            <motion.div 
                              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600"
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </div>
                      </div>

                      <div className="relative">
                        <AnimatePresence mode="wait">
                          {formStatus === 'success' ? (
                            <motion.div
                              key="success"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 dark:from-green-500/10 dark:to-green-600/10 rounded-xl p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white">
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.1 }}
                                  >
                                    <FiCheck size={20} />
                                  </motion.div>
                                </div>
                                <div>
                                  <p className="font-medium text-green-700 dark:text-green-400">
                                    {t('contact.success')}
                                  </p>
                                  <p className="text-sm text-green-600/70 dark:text-green-500/70">
                                    {t('contact.successMessage', "I'll get back to you soon!")}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.button
                              type="submit"
                              className="group relative overflow-hidden px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-400 text-white font-medium shadow-lg flex items-center gap-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              disabled={isSubmitting || formStatus === 'success'}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              key="sendButton"
                            >
                              {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                  <motion.div
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                  />
                                  <span>{t('contact.sending')}...</span>
                                </div>
                              ) : (
                                <span className="flex items-center gap-2">
                                  {t('contact.send')} 
                                  <motion.span 
                                    className="relative" 
                                    animate={{ x: [-3, 3, -3] }} 
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                  >
                                    <FiSend />
                                  </motion.span>
                                </span>
                              )}
                              
                              <motion.div 
                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-500 to-purple-500 dark:from-primary-400 dark:to-purple-400"
                                initial={{ x: '100%' }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                              />
                              
                              <motion.div 
                                className="absolute inset-0 opacity-30"
                                animate={{ 
                                  background: [
                                    'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)', 
                                    'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.15) 0%, transparent 50%)'
                                  ],
                                }}
                                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                              />
                              
                              <span className="relative z-10">
                                {!isSubmitting && (
                                  <motion.div 
                                    className="absolute -right-10 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-12 transition-all duration-300"
                                  >
                                    <FiArrowRight />
                                  </motion.div>
                                )}
                              </span>
                            </motion.button>
                          )}
                        </AnimatePresence>

                        {formStatus === 'error' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 text-red-600 dark:text-red-400 flex items-center gap-1 p-3 rounded-lg bg-red-50 dark:bg-red-900/20"
                          >
                            <FiX /> {t('contact.error')}
                          </motion.div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced contact info with interactive cards */}
            <motion.div variants={itemVariants} className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  className="group block relative overflow-hidden rounded-xl bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm shadow-lg border border-gray-100/50 dark:border-dark-300/30 transition-all duration-300"
                  whileHover={{ 
                    y: -5,
                    boxShadow: `0 15px 30px -5px ${info.shadowColor}`,
                    transition: { duration: 0.2 }
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="p-5 flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${info.bgColor} ${info.textColor} relative overflow-hidden`}>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundImage: `linear-gradient(to right, ${info.shadowColor}, transparent)` }}
                      />
                      <div className="relative z-10">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">{info.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{info.value}</p>
                    </div>
                  </div>
                  
                  {/* Gradient line at bottom */}
                  <motion.div 
                    className="h-0.5 w-full bg-gradient-to-r absolute bottom-0 left-0"
                    style={{ backgroundImage: `linear-gradient(to right, ${info.color})` }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}

              {/* Enhanced social media section */}
              <motion.div
                className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm shadow-lg border border-gray-100/50 dark:border-dark-300/30 p-6"
                whileHover={{ boxShadow: "0 15px 30px -5px rgba(79, 70, 229, 0.2)" }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold mb-5 relative inline-block">
                  Social Media
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  />
                </h3>
                
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-12 h-12 rounded-full flex items-center justify-center text-white overflow-hidden shadow-lg"
                      whileHover={{ 
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${social.color}`} />
                      
                      {/* Shine effect */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        initial={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)' }}
                        whileHover={{ 
                          background: 'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)'
                        }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      <motion.div
                        className="relative z-10 text-lg"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {social.icon}
                      </motion.div>
                      
                      {/* Tooltip */}
                      <motion.div 
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 pointer-events-none whitespace-nowrap"
                        transition={{ duration: 0.2 }}
                      >
                        {social.name}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 border-b-4 border-l-4 border-r-4 border-b-gray-800 border-l-transparent border-r-transparent"></div>
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
                
                {/* Background pattern */}
                <div className="absolute -right-4 -bottom-4 w-20 h-20 opacity-10">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="2" fill="currentColor"/>
                    <circle cx="30" cy="10" r="2" fill="currentColor"/>
                    <circle cx="50" cy="10" r="2" fill="currentColor"/>
                    <circle cx="70" cy="10" r="2" fill="currentColor"/>
                    <circle cx="10" cy="30" r="2" fill="currentColor"/>
                    <circle cx="30" cy="30" r="2" fill="currentColor"/>
                    <circle cx="50" cy="30" r="2" fill="currentColor"/>
                    <circle cx="70" cy="30" r="2" fill="currentColor"/>
                    <circle cx="10" cy="50" r="2" fill="currentColor"/>
                    <circle cx="30" cy="50" r="2" fill="currentColor"/>
                    <circle cx="50" cy="50" r="2" fill="currentColor"/>
                    <circle cx="70" cy="50" r="2" fill="currentColor"/>
                    <circle cx="10" cy="70" r="2" fill="currentColor"/>
                    <circle cx="30" cy="70" r="2" fill="currentColor"/>
                    <circle cx="50" cy="70" r="2" fill="currentColor"/>
                    <circle cx="70" cy="70" r="2" fill="currentColor"/>
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;