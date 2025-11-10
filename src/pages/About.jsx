import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, Heart } from 'lucide-react';

const aboutCards = [
  {
    id: 1,
    title: "Who I Am",
    content: "A passionate software engineering student with a love for problem-solving and building impactful applications.",
  },
  {
    id: 2,
    title: "What I Do",
    content: "I specialize in full-stack development, competitive programming, and creating elegant solutions to complex problems.",
  },
  {
    id: 3,
    title: "What I Love",
    content: "Mathematics, algorithms, building innovative projects, and constantly learning new technologies to stay ahead.",
  },
  {
    id: 4,
    title: "Languages & Web Dev",
    content: "Programming: Python, C++, C, JavaScript. Web: React.js, Node.js, Express, Redux, HTML5, CSS3, Tailwind, REST APIs, JWT."
  },
  {
    id: 5,
    title: "Data, ML & AI",
    content: "Databases: PostgreSQL, MongoDB. ML/AI: Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Traditional ML. Learning TensorFlow & PyTorch."
  },
  {
    id: 6,
    title: "CS Fundamentals & Tools",
    content: "Core: DSA, OOP, OS, DBMS, Theory of Computation. Tools: Git, GitHub, Linux, Bash, VS Code, Figma, Firebase."
  },
];

const About = () => {
  return (
    <section id="about" className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/10 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-red-500">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" />
        </motion.div>

        {/* new content grid */}
        <div className='mb-[2%] ml-[2%] w-[100%] md:h-[80vh] mr-[3%] md:flex relative overflow-hidden'>
          <div className='md:w-[40%] md:border-r-2 border-red-600/40 p-5 pt-0'>
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center"
            >
              <div className="max-w-3xl mt-5 mx-auto bg-white/5 backdrop-blur-lg rounded-2xl border border-red-600/20 p-8">
                <p className="text-lg text-gray-300 leading-relaxed"
                >
                  Myself <span className='text-2xl font-bold'> Gourav Makode </span>, Currently a student passionate about software development and problem-solving.
                  Building innovative solutions with modern technologies.
                </p>
                {/* mathy pattern */}
                <div className="mt-6 flex items-center justify-center gap-4 text-red-600/60 text-sm font-mono">
                  <span>f(x) = ∫ code dx</span>
                  <span>|</span>
                  <span>lim(n→∞) learning</span>
                  <span>|</span>
                  <span>∑ passion</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className='md:w-[55%] p-5 overflow-y-scroll scrollbar-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            {/* Content Grid */}
          <div className="grid grid-cols-1 gap-8">
            {aboutCards.map((card, index) =>
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Glass Morphic Card */}
                <div className="relative h-full bg-white/5 backdrop-blur-lg rounded-2xl border border-red-500/20 p-5  overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/20">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {card.content}
                    </p>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all duration-300" />
                </div>
              </motion.div>
            )}
        </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
