import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheck, FiX } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [formStatus, setFormStatus] = useState(null); // null, 'success', 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
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
        'service_x6g1c27', // Replace with your EmailJS service ID
        'template_y4vaxrf', // Replace with your EmailJS template ID
        formRef.current,
        'UAr9FrxM_siIucO4v' // Replace with your EmailJS public key
      );
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send message:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 3 seconds
      setTimeout(() => setFormStatus(null), 3000);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail className="text-xl" />,
      title: 'Email',
      value: 'zakariaoumghar1@gmail.com',
      link: 'mailto:zakaria.oumghar1@gmail.com',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      icon: <FiMapPin className="text-xl" />,
      title: 'Location',
      value: 'Morocco, Berrechid',
      link: '#',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
    {
      icon: <FiPhone className="text-xl" />,
      title: 'Phone',
      value: '+212 619-665220',
      link: 'tel:+212619-665220',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            {t('contact.title')}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            {t('contact.description')}
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="md:col-span-2">
              <form ref={formRef} onSubmit={handleSubmit} className="card">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t('contact.nameLabel')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('contact.emailLabel')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <motion.button
                    type="submit"
                    className="btn-primary inline-flex items-center gap-2 hover-trigger"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting || formStatus === 'success'}
                  >
                    {isSubmitting ? (
                      <>{t('contact.sending')}...</>
                    ) : formStatus === 'success' ? (
                      <>
                        <FiCheck /> {t('contact.success')}
                      </>
                    ) : (
                      <>
                        {t('contact.send')} <FiSend />
                      </>
                    )}
                  </motion.button>

                  {formStatus === 'error' && (
                    <div className="text-red-500 flex items-center gap-1">
                      <FiX /> {t('contact.error')}
                    </div>
                  )}
                </div>
              </form>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="card flex items-start gap-4 hover:shadow-xl transition-shadow duration-300 hover-trigger"
                >
                  <div className={`p-3 rounded-lg ${info.color}`}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{info.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{info.value}</p>
                  </div>
                </a>
              ))}

              <div className="card mt-6">
                <h3 className="text-lg font-semibold mb-4">Social Media</h3>
                <div className="flex gap-4">
                  {[{name: 'github', link: "https://github.com/zackweb-pro"},
                  {name: 'linkedin', link: "https://www.instagram.com/zakaria.oumghar/"},
                  {name: 'instagram', link: "https://www.linkedin.com/in/zakaria-oumghar-b30b9b1bb/"}].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-dark-300 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary-500 hover:text-white transition-colors duration-300 hover-trigger"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className={`fi fi-brands-${social.name}`}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;