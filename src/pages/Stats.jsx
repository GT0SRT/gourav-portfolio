import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Animate Projects counter
      const projectsInterval = setInterval(() => {
        setProjectsCount((prev) => {
          if (prev >= 50) {
            clearInterval(projectsInterval);
            return 50;
          }
          return prev + 1;
        });
      }, 30);

      // Animate Clients counter
      const clientsInterval = setInterval(() => {
        setClientsCount((prev) => {
          if (prev >= 100) {
            clearInterval(clientsInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 20);

      // Animate Reviews counter
      const reviewsInterval = setInterval(() => {
        setReviewsCount((prev) => {
          if (prev >= 500) {
            clearInterval(reviewsInterval);
            return 500;
          }
          return prev + 10;
        });
      }, 10);

      return () => {
        clearInterval(projectsInterval);
        clearInterval(clientsInterval);
        clearInterval(reviewsInterval);
      };
    }
  }, [isInView]);

  const stats = [
    {
      count: projectsCount,
      suffix: '+',
      label: 'Projects',
      sublabel: 'Completed'
    },
    {
      count: clientsCount,
      suffix: '+',
      label: 'Satisfied',
      sublabel: 'Clients'
    },
    {
      count: reviewsCount,
      suffix: '+',
      label: 'Positive',
      sublabel: 'Reviews'
    }
  ];

  return (
    <section ref={ref} className="relative md:py-32 pb-44 px-4 overflow-hidden bg-black">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="text-center relative"
            >
              {/* Vertical divider (hidden on mobile, shown on md+) */}
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 h-24 w-px bg-gray-800" />
              )}

              {/* Count */}
              <div className="mb-4">
                <span 
                  className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-red-600"
                >
                  {stat.count}{stat.suffix}
                </span>
              </div>

              {/* Label */}
              <div>
                <p className="text-xl md:text-2xl font-light text-red-600">
                  {stat.label}
                </p>
                <p className="text-xl md:text-2xl font-light text-red-600">
                  {stat.sublabel}
                </p>
              </div>

              {/* Glow effect */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
                className="absolute inset-0 blur-3xl -z-10"
                style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;