// import { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';

// const CustomCursor = () => {
//   const cursorRef = useRef(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const requestRef = useRef();
  
//   // Check for dark mode
//   useEffect(() => {
//     const checkDarkMode = () => {
//       const isDark = document.documentElement.classList.contains('dark');
//       setIsDarkMode(isDark);
//     };
    
//     // Initial check
//     checkDarkMode();
    
//     // Set up observer for theme changes
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.documentElement, { attributes: true });
    
//     return () => observer.disconnect();
//   }, []);
  
//   useEffect(() => {
//     // Device detection
//     const isMobileDevice = () => {
//       return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//     };
    
//     // Skip cursor on mobile devices
//     if (isMobileDevice()) return;
    
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: e.clientX,
//         y: e.clientY
//       });
//     };
    
//     const handleMouseDown = () => setIsClicked(true);
//     const handleMouseUp = () => setIsClicked(false);
    
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mousedown', handleMouseDown);
//     window.addEventListener('mouseup', handleMouseUp);
    
//     // Handle hover states
//     const handleMouseOver = () => setIsHovered(true);
//     const handleMouseOut = () => setIsHovered(false);
    
//     const interactElements = document.querySelectorAll('a, button, input, select, .hover-trigger');
//     interactElements.forEach(element => {
//       element.addEventListener('mouseover', handleMouseOver);
//       element.addEventListener('mouseout', handleMouseOut);
//     });
    
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mousedown', handleMouseDown);
//       window.removeEventListener('mouseup', handleMouseUp);
      
//       interactElements.forEach(element => {
//         element.removeEventListener('mouseover', handleMouseOver);
//         element.removeEventListener('mouseout', handleMouseOut);
//       });
//     };
//   }, []);
  
//   // Dynamic cursor styling based on mode
//   const cursorColor = isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
//   const cursorHoverColor = isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';
//   const cursorShadowColor = isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 100, 255, 0.5)';
//   const ringColor = isDarkMode ? 'rgba(125, 211, 252, 0.3)' : 'rgba(2, 132, 199, 0.2)';
  
//   return (
//     <>
//       {/* Main cursor dot */}
//       <motion.div 
//         className="cursor-dot"
//         animate={{
//           x: mousePosition.x,
//           y: mousePosition.y,
//           scale: isHovered ? 1.6 : isClicked ? 0.8 : 1,
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 500,
//           damping: 28,
//           mass: 0.5,
//         }}
//         style={{
//           position: 'fixed',
//           top: -8,
//           left: -8,
//           width: 16,
//           height: 16,
//           borderRadius: '50%',
//           backgroundColor: isHovered ? cursorHoverColor : cursorColor,
//           pointerEvents: 'none',
//           zIndex: 9999,
//           boxShadow: `0 0 ${isHovered ? '16px' : '10px'} ${cursorShadowColor}`,
//         }}
//       />
      
//       {/* Cursor ring */}
//       <motion.div
//         className="cursor-ring"
//         animate={{
//           x: mousePosition.x,
//           y: mousePosition.y,
//           scale: isHovered ? 1.8 : isClicked ? 0.6 : 1,
//           opacity: isHovered ? 0.8 : 0.5,
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 350,
//           damping: 25,
//           mass: 1,
//         }}
//         style={{
//           position: 'fixed',
//           top: -30,
//           left: -30,
//           width: 60,
//           height: 60,
//           borderRadius: '50%',
//           border: `2px solid ${ringColor}`,
//           pointerEvents: 'none',
//           zIndex: 9998,
//         }}
//       />
      
//       {/* Subtle glow effect */}
//       <motion.div
//         className="cursor-glow"
//         animate={{
//           x: mousePosition.x,
//           y: mousePosition.y,
//           scale: isHovered ? 2.5 : isClicked ? 0.5 : 1.2,
//           opacity: isHovered ? 0.2 : isClicked ? 0.3 : 0.15,
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 300,
//           damping: 20,
//           mass: 1.2,
//         }}
//         style={{
//           position: 'fixed',
//           top: -50,
//           left: -50,
//           width: 100,
//           height: 100,
//           borderRadius: '50%',
//           background: isDarkMode ? 
//             'radial-gradient(circle, rgba(125,211,252,0.5) 0%, rgba(125,211,252,0) 70%)' : 
//             'radial-gradient(circle, rgba(2,132,199,0.3) 0%, rgba(2,132,199,0) 70%)',
//           pointerEvents: 'none',
//           zIndex: 9997,
//         }}
//       />
//     </>
//   );
// };

// export default CustomCursor;