import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Github, Linkedin, Code2, Trophy, ArrowDown } from 'lucide-react';
import img from '../assets/gourav1.jpg';

const Hero = () => {
  const textArray = ['Software Engineer' , 'ML Engineer','Data Scientist', 'Frontend Developer', 'UI/UX Designer', 'Web Developer'];
  const period = 2000;
  const [scrollY, setScrollY] = useState(0);
  // mouse follow motion values
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 120, damping: 22, mass: 0.4 });
  const y = useSpring(mvY, { stiffness: 120, damping: 22, mass: 0.4 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse position and map 
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const relX = (e.clientX - w / 2) / (w / 2);
      const relY = (e.clientY - h / 2) / (h / 2);
      const amplitude = 18;
      mvX.set(relX * amplitude);
      mvY.set(relY * amplitude);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mvX, mvY]);

  const socialIcons = [
    { icon: Github, link: "https://github.com/gt0srt", label: 'GitHub' },
    { icon: Linkedin, link: "https://linkedin.com/in/gouravmakode", label: 'LinkedIn' },
    { icon: Code2, link: "https://leetcode.com/gt0srt", label: 'LeetCode' },
    { icon: Trophy, link: "https://www.codechef.com/users/gt0srt", label: 'CodeChef' },
    { icon: Code2, link: "https://codeforces.com/profile/gt0srt", label: 'Codeforces' }
  ];

  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const current = loopNum % textArray.length;
    const fullText = textArray[current];

    let typingSpeed = 120;
    if (isDeleting) typingSpeed /= 2;
    const timeout = setTimeout(() => {
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      // If word is complete
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), period);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, loopNum, textArray, period]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/60 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-800/40 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
        {/* Tagline at top */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-500 md:mt-28 text-xs md:text-base uppercase tracking-widest mb-7"
        >
          Crafting Digital Solutions Since — Y:2023
        </motion.p>

        <div className="relative mb-8">
          {/* First Name */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <h1 className="text-[19vw] md:text-[22vw] lg:text-[16vw] font-black leading-none tracking-tighter">
              <span className="inline-block text-red-600 select-none">GOURAV</span>
            </h1>
          </motion.div>

          {/* Last Name */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <h1 className="text-[18vw] md:text-[21vw] lg:text-[15vw] font-black leading-none tracking-tighter">
              <span className="inline-block text-red-600 select-none">MAKODE</span>
            </h1>
          </motion.div>

          {/* Hero Profile Image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              style={{ x, y }}
              className="z-20 mt-20 md:mt-0 h-40 w-25 md:h-60 md:w-36 lg:h-60 lg:w-36 rounded-[32px] overflow-hidden shadow-2xl"
            >
              <img
                src={img}
                alt={"hero pfp"}
                className="w-full h-full object-cover"
                draggable="false"
              />
            </motion.div>
          </div>
        </div>

        {/* Designation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-2xl mt-16 md:text-3xl lg:text-4xl font-light mb-8 text-red-600"
        >
          <span className="border-r-2 border-red-600 pr-1 font-medium">
            {text}
          </span>
        </motion.p>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          {socialIcons.map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="group relative"
            >
              <div className="p-4 bg-white/5 border-red-600 backdrop-blur-sm rounded-xl text-red-600 border transition-all duration-300 hover:shadow-lg"
                style={{ 
                  boxShadow: '0 0 20px rgba(255, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.1)';
                }}
              >
                <social.icon className="h-3 w-3 md:w-6 md:h-6 text-gray-400 group-hover:text-red-600 transition-colors" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500 mb-7"
        >
          <span className="text-sm uppercase tracking-wider">Scroll Down</span>
          <ArrowDown className="w-6 h-6 text-red-600" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;