import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const education = [
  {
    id: 1,
    institution: "University Institute of Technology",
    degree: "Bachelor of Technology in Computer Science",
    duration: "2023 - 2027",
    description: "Focused on software engineering, data structures, algorithms, and mathematics.",
    grade: "CGPA: 7.77/10"
  },
  {
    id: 2,
    institution: "Senior Secondary School",
    degree: "Higher Secondary Education (Science)",
    duration: "2022 - 2023",
    description: "Specialized in Physics, Chemistry, and Mathematics.",
    grade: "Percentage: 84%"
  }
];

const Education = () => {
  return (
    <section id="education" className="relative py-32 px-4 overflow-hidden bg-black">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-red-600">
          EDUCATION
        </h2>
        <div className="w-32 h-1 mx-auto bg-red-600" />
      </motion.div>

      {/* Timeline Container */}
      <div className="max-w-6xl mx-auto relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 hidden lg:block" style={{ background: 'linear-gradient(to bottom, transparent, #dc2626, transparent)' }} />

        {/* Education Items */}
        <div className="space-y-20">
          {education.map((edu, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`w-full lg:w-5/12 ${
                  isEven ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative p-8 border-2 rounded-2xl bg-black/50 backdrop-blur-sm group border-red-600/30"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#dc2626';
                      e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Duration Badge */}
                    <div className={`inline-flex text-red-600 border-red-600 bg-red-600/10 items-center gap-2 px-4 py-2 rounded-full mb-4 border ${
                      isEven ? 'lg:float-right' : 'lg:float-left'
                    }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span className="text-xs font-semibold">{edu.duration}</span>
                    </div>

                    <div className="clear-both" />

                    <h3 className="text-3xl md:text-3xl font-bold mb-2 text-red-600">
                      {edu.institution}
                    </h3>

                    <p className="text-md text-gray-300 mb-4 font-medium">
                      {edu.degree}
                    </p>

                    <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                      {edu.description}
                    </p>

                    <div className="flex items-center gap-2" style={{
                      justifyContent: isEven ? 'flex-end' : 'flex-start'
                    }}>
                      <Award className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-600">
                        {edu.grade}
                      </span>
                    </div>

                    {/* Decorative corner */}
                    <div
                      className={`absolute top-4 w-16 h-16 border-t-2 border-red-600/30 ${
                        isEven ? 'right-4 border-r-2' : 'left-4 border-l-2'
                      }`}
                    />
                    <div
                      className={`absolute bottom-4 w-16 h-16 border-b-2 border-red-600/30 ${
                        isEven ? 'left-4 border-l-2' : 'right-4 border-r-2'
                      }`}
                    />
                  </motion.div>
                </div>

                {/* Center Icon (Timeline Node) */}
                <div className="hidden border-red-600 bg-black lg:flex absolute left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full items-center justify-center border-4 z-10"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 0, 0, 0.5)'
                  }}
                >
                  <GraduationCap className="w-10 h-10 text-red-600" />
                </div>

                {/* Empty space for opposite side */}
                <div className="hidden lg:block w-5/12" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(192, 255, 0, 0.1)' }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
        className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl bg-red-600/10"
      />
    </section>
  );
};

export default Education;