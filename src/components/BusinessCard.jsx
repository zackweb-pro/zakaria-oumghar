import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiLinkedin } from 'react-icons/fi';

const BusinessCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div className="perspective-500 w-full max-w-md mx-auto h-56 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div 
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Front */}
        <div className={`absolute w-full h-full rounded-xl p-6 flex flex-col justify-between 
                        bg-gradient-to-br from-primary-500 to-primary-700 text-white 
                        backface-hidden ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
          <div>
            <h2 className="text-2xl font-bold">Zakaria Oumghar</h2>
            <p className="text-sm opacity-90">Software Engineering Student</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-75">Click to flip</p>
          </div>
        </div>
        
        {/* Back */}
        <div className={`absolute w-full h-full rounded-xl p-6
                        bg-white dark:bg-dark-200 shadow-xl
                        backface-hidden [transform:rotateY(180deg)] ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-full flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-primary-600">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FiMail />
                <span>zakariaoumghar1@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone />
                <span>+212 619-665220</span>
              </div>
              <div className="flex items-center gap-2">
                <FiLinkedin />
                <span>zakaria-oumghar</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-75">Click to flip</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};