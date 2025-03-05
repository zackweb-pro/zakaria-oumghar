import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiCode, FiAward } from 'react-icons/fi';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const AboutSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
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

  const education = Array.isArray(t('about.educationList', { returnObjects: true })) ? t('about.educationList', { returnObjects: true }) : [];
  const interests = Array.isArray(t('about.interestsList', { returnObjects: true })) ? t('about.interestsList', { returnObjects: true }) : [];

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-dark-200">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            {t('about.title')}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="md:col-span-2">
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6">
                {t('about.description')}
              </p>

              {/* Education Timeline */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">{t('about.education')}</h3>
                <VerticalTimeline>
                  {education.map((edu, index) => (
                    <VerticalTimelineElement
                      key={index}
                      className="vertical-timeline-element--work"
                      contentStyle={{ background: 'var(--content-bg)', color: 'var(--text-color)', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                      contentArrowStyle={{ borderRight: '7px solid var(--content-bg)' }}
                      date={edu.period}
                      iconStyle={{ background: '#7dd3fc', color: '#fff', width: '30px', height: '30px', marginLeft: '-15px' }}
                    >
                      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100">{edu.degree}</h3>
                      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6">{edu.university}</p>
                    </VerticalTimelineElement>
                  ))}
                </VerticalTimeline>
              </div>

              {/* Interests */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">{t('about.interests')}</h3>
                <div className="flex flex-wrap gap-3">
                  {interests.map((interest, index) => (
                    <div key={index} className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm shadow-md">
                      {interest}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Image Section */}
            <motion.div variants={itemVariants} className="relative">
              <div className="sticky top-24">
                <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
                    alt="Coding"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <div className="text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <FiCode className="text-primary-400" />
                        <span className="font-medium">Software Engineering</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiAward className="text-primary-400" />
                        <span>Problem Solver</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
