import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { client } from '../components/client';

// const reviews = [
//   {
//     id: 1,
//     name: "Rajesh Kumar",
//     role: "Senior Developer",
//     company: "Tech Solutions Inc.",
//     review: "Gourav is an exceptional problem solver with a deep understanding of algorithms. His dedication and passion for coding are truly impressive.",
//     rating: 5,
//     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh"
//   },
//   {
//     id: 2,
//     name: "Priya Sharma",
//     role: "Project Manager",
//     company: "Digital Innovations",
//     review: "Working with Gourav was a great experience. He delivers quality work on time and has excellent communication skills.",
//     rating: 5,
//     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
//   },
//   {
//     id: 3,
//     name: "Amit Patel",
//     role: "Tech Lead",
//     company: "StartupHub",
//     review: "Gourav's ability to quickly learn new technologies and apply them effectively is remarkable. A valuable asset to any team.",
//     rating: 5,
//     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit"
//   },
//   {
//     id: 4,
//     name: "Sneha Reddy",
//     role: "Frontend Developer",
//     company: "WebCraft Studios",
//     review: "Gourav has a keen eye for detail and creates beautiful, functional user interfaces. His code is clean and well-structured.",
//     rating: 5,
//     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha"
//   }
// ];

const Reviews = () => {
  const controls = useAnimationControls();
  useEffect(() => {
    controls.start({
      x: "-50%",
      transition: {
        ease: "linear",
        duration: 60,
        repeat: Infinity,
      },
    });
  }, [controls]);

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const query = '*[_type == "review"]';
    client.fetch(query)
      .then((data) => {
        setReviews(data);
      })
      .catch(console.error);
  }, []);

  return (
    <section id="reviews" className="relative py-32 px-4 overflow-hidden bg-black">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-red-600">
          TESTIMONIALS
        </h2>
        <div className="w-32 h-1 mx-auto mb-4 bg-red-500" />
        <p className="text-gray-400 text-lg">What people say about working with me</p>
      </motion.div>

      {/* Horizontal Scrolling Container */}
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        <div className="w-full overflow-hidden"
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() => controls.start({
            x: "-50%",
            transition: {
              ease: "linear",
              duration: 30,
              repeat: Infinity,
            },
        })}>
        <motion.div
          className="flex w-max gap-2"
          animate={controls}
        > 
          {/* --- First copy --- */}
          {reviews.map((review) => (
            <div 
              key={review._id + "-1"}
              className="flex flex-col items-center justify-center p-4 bg-transparent rounded-xl 
              shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl
              w-60 md:w-96"
            >
              {/* Card */}
                <div 
                  className="relative h-full bg-black/50 backdrop-blur-lg rounded-2xl border-2 border-red-700 p-5 md:p-8 overflow-hidden transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-20">
                    <Quote className="w-16 h-16 text-red-600" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header with Avatar and Info */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="w-14 h-14 md:h-20 md:w-20 rounded-full overflow-hidden border-t-2 border-red-600">
                          <img
                            src={review.avatarURL}
                            alt={review.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full blur-md" style={{ backgroundColor: 'rgba(255, 0, 0, 0.2)' }} />
                      </div>

                      <div className="flex-1">
                        <h4 className="text-sm md:text-lg font-bold text-white group-hover:text-red-600 transition-colors">
                          {review.name}
                        </h4>
                        {/* <p className="text-xs md:text-sm text-gray-400">{review.role}</p> */}
                        <p className="text-xs md:text-sm text-red-600">{review.role}</p>
                      </div>
                    </div>
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(Number(review.rating))].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5"
                          style={{ fill: '#dc2626', color: '#dc2626' }}
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed italic">
                      "{review.reviewText}"
                    </p>
                  </div>

                  {/* Decorative corners */}
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 rounded-tr-2xl" style={{ borderColor: 'rgba(255, 0, 0, 0.3)' }} />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 rounded-bl-2xl" style={{ borderColor: 'rgba(255, 0, 0, 0.3)' }} />
                </div>
            </div>
          ))}

          {/* --- Second copy --- */}
          {reviews.map((review) => (
            <div 
              key={review._id + "-2"}
              className="flex flex-col items-center justify-center p-4 bg-transparent 
              rounded-xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 
              hover:shadow-xl w-60 md:w-96"
            >
              {/* Card */}
                <div 
                  className="relative h-full bg-black/50 backdrop-blur-lg rounded-2xl border-2 border-red-700 p-5 md:p-8 overflow-hidden transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-20">
                    <Quote className="w-16 h-16 text-red-600" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header with Avatar and Info */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="w-14 h-14 md:h-20 md:w-20 rounded-full overflow-hidden border-t-2 border-red-600">
                          <img
                            src={review.avatarURL}
                            alt={review.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full blur-md" style={{ backgroundColor: 'rgba(255, 0, 0, 0.2)' }} />
                      </div>

                      <div className="flex-1">
                        <h4 className="text-sm md:text-lg font-bold text-white group-hover:text-red-600 transition-colors">
                          {review.name}
                        </h4>
                        {/* <p className="text-xs md:text-sm text-gray-400">{review.role}</p> */}
                        <p className="text-xs md:text-sm text-red-600">{review.role}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(Number(review.rating))].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5"
                          style={{ fill: '#dc2626', color: '#dc2626' }}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed italic">
                      "{review.reviewText}"
                    </p>
                  </div>

                  {/* Decorative corners */}
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 rounded-tr-2xl" style={{ borderColor: 'rgba(255, 0, 0, 0.3)' }} />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 rounded-bl-2xl" style={{ borderColor: 'rgba(255, 0, 0, 0.3)' }} />
                </div>
            </div>
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;