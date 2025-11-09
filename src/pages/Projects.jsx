import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { client } from '../components/client';

const CursorContext = createContext();
const CursorProvider = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', mouseMove);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  // Cursor animation variants
  const variants = {
    visit: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: '#ffffff',
      mixBlendMode: 'difference',
    },
  };

  // Text animation variants
  const textVariants = {
    visit: { opacity: 1, color: '#000000' },
  };

  return (
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant }}>
      {/* The Custom Cursor Element */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full font-bold"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.span
          variants={textVariants}
          animate={cursorVariant}
          transition={{ duration: 0.1 }}
          className={`text-sm uppercase ${window.scrollY < 2500 ? 'hidden' : 'block'}`}
        >
          Visit
        </motion.span>
      </motion.div>
      {children}
    </CursorContext.Provider>
  );
};

const useCursor = () => useContext(CursorContext);

const ProjectCard = ({ project, isFirst }) => {
  const ref = useRef(null);
  const { setCursorVariant } = useCursor();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [isFirst ? 1 : 0.9, 1]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [isFirst ? 1 : 0.6, 1]
  );

  return (
    // Outer wrapper for scroll spacing
    <div ref={ref} className="h-screen">
      {/* Inner sticky container */}
      <motion.div
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
        style={{ scale, opacity }}
      >
        <div
          className="absolute inset-0 z-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${project.bgImg})` }}
        />
        <div className="absolute inset-0 z-10 h-full w-full bg-black/60" />
        <div
          className="relative z-20 flex h-full w-full flex-col items-center justify-center p-8 text-center text-white"
          onMouseEnter={() => setCursorVariant('visit')}
          onMouseLeave={() => setCursorVariant('')}
        >
          <h2 className="mb-4 text-5xl font-extrabold sm:text-7xl">
            {project.title}
          </h2>
          <p className="mb-8 max-w-2xl text-lg text-gray-200">
            {project.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const query = '*[_type == "projects"]';
    client.fetch(query)
      .then((data) => {
        setProjects(data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="text-center mb-16 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-red-600"
        >
          Projects
        </motion.h2>
        <div className="w-32 h-1 mx-auto bg-red-600" />
      </div>
      <section className="relative bg-black">
        {projects.map((project, index) => (
          <ProjectCard
            key={project._id}
            project={project}
            isFirst={index === 0}
          />
        ))}
      </section>
    </>
  );
};

export default function ProjectsPage() {
  return (
    <CursorProvider>
      {/* hide the default system cursor for this entire section */}
      <div id="projects" className="cursor-none">
        <Projects />
      </div>
    </CursorProvider>
  );
}