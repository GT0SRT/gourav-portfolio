import React, { useEffect, useState } from 'react';
import { motion, transform, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { client } from '../components/client';

const Skills = () => {
  const skillsRow1 = [
    'CREATOR', 'PROBLEM SOLVER', 'REACT', 'NODE.JS', 'PYTHON', 'JAVASCRIPT', 
    'MONGODB', 'EXPRESS', 'TAILWIND', 'FULL-STACK DEVELOPER',
  ];

  const skillsRow2 = [
    'ALGORITHM MASTER', 'C++', 'JAVA', 'DATA STRUCTURES', 'COMPETITIVE PROGRAMMER',
    'GIT', 'DOCKER', 'REST APIs', 'DATABASE DESIGN', 'CODE ARCHITECT'
  ];

  // Duplicate arrays for seamless infinite scroll
  const row1Content = [...skillsRow1, ...skillsRow1, ...skillsRow1];
  const row2Content = [...skillsRow2, ...skillsRow2, ...skillsRow2];

  // Scroll-based motion speed
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const baseX = useTransform(smoothVelocity, [0, 1000], [0, -100]);

  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const query = '*[_type == "skill"]';
    client.fetch(query)
      .then((data) => {
        setSkills(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
    <section id="skills" className="relative py-32 overflow-hidden bg-black">
      {/* Section Header */}
      <div className="text-center mb-16 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-red-600"
        >
          SKILLS
        </motion.h2>
        <div className="w-32 h-1 mx-auto bg-red-600" />
      </div>

      {/* Marquee Container */}
      <div className="space-y-8">
        {/* Row 1 - Moving Right */}
        <div style={{ transform: `rotate(-9deg)` }} className="relative overflow-hidden">
          <motion.div
            animate={{
              x: ['0%', '-33.333%']
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="flex whitespace-nowrap"
          >
            {row1Content.map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center mx-2"
              >
                <span
                  className="text-red-600 text-xl md:text-6xl lg:text-5xl font-black tracking-tighter"
                >
                  {skill}
                </span>
                <span className="text-xl md:text-6xl lg:text-5xl mx-2 text-red-600">✦</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Moving Left */}
        <div style={{ transform: `rotate( 7deg)` }} className="-top-10 md:top-0 relative overflow-hidden">
          <motion.div
            animate={{
              x: ['-33.333%', '0%']
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="flex whitespace-nowrap bg-black"
          >
            {row2Content.map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center mx-2"
              >
                <span
                  className="text-xl md:text-6xl lg:text-5xl font-black tracking-tighter text-red-600"
                >
                  {skill}
                </span>
                <span className="text-xl md:text-6xl lg:text-5xl mx-2 text-red-600">✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>     

      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
      </section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-center mb-24"
      >
      <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl border border-red-600/20 p-8">
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex w-max gap-6"
          animate={{ x: "-50%" }}
          transition={{
            ease: "linear",
            duration: 40, // Adjust duration for speed
            repeat: Infinity,
          }}
        > 
          {/* --- First copy --- */}
          {skills.map((skill) => (
            <div 
              key={skill.name + "-1"}
              className="flex flex-col items-center justify-center p-4 bg-transparent rounded-xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
            >
              <img src={skill.logo} alt={`${skill.name} logo`} className="h-12 w-12 object-contain mb-3" />
              <p className="text-sm font-medium text-gray-400 text-center">{skill.name}</p>
            </div>
          ))}

          {/* --- Second copy --- */}
          {skills.map((skill) => (
            <div 
              key={skill.name + "-2"}
              className="flex flex-col items-center justify-center p-4 bg-transparent rounded-xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
            >
              <img src={skill.logo} alt={`${skill.name} logo`} className="h-12 w-12 object-contain mb-3" />
              <p className="text-sm font-medium text-gray-400 text-center">{skill.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
      </div>
      </motion.div>
    </div>
  );
};

export default Skills;