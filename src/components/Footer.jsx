import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { create } from "zustand";

const socialLinks = {
  github: "https://github.com/gt0srt",
  linkedin: "https://linkedin.com/in/makodegourav",
  leetcode: "https://leetcode.com/gt0srt",
  codechef: "https://www.codechef.com/users/gt0srt",
  codeforces: "https://codeforces.com/profile/gt0srt"
};

// Zustand store for time
  const useTimeStore = create((set) => ({
    time: "",
    updateTime: () => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      set({ time: `${hours}:${minutes}` });
    },
  }));

const Footer = () => {
    const { time, updateTime } = useTimeStore();
  
    useEffect(() => {
      updateTime();
      const interval = setInterval(updateTime, 30 * 1000);
      return () => clearInterval(interval);
    }, [updateTime]);

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative px-4 overflow-hidden bg-black">
  {/* <div className="footer-watermark">YOUR NAME</div> */}
      {/* Divider Line with Glow */}
      <div className="relative mb-7">
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[#dc2626] to-transparent blur-sm" />
        <div className="h-px bg-gradient-to-r from-transparent via-[#dc2626] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left md:ml-[15%]"
          >
            <h3 className="text-3xl font-black mb-2">
              <span className="text-white">Gourav</span>
              <span style={{ color: '#dc2626' }}>.</span>
            </h3>
            <p className="text-gray-400 text-sm">A Humanbeing!?</p>
          </motion.div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-300 italic font-light text-md">
              "Crafted with logic, creativity, and endless curiosity."
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Heart className="w-5 h-5 animate-pulse" style={{ color: '#dc2626', fill: '#dc2626' }} />
              <span className="text-gray-500 text-sm">Made with passion</span>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center md:justify-end gap-4 mr-[15%]"
          >
            <motion.a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border-2 transition-all duration-300 group"
              style={{ borderColor: 'rgba(255, 0, 0, 0.3)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#dc2626';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Github className="w-5 h-5 text-gray-400 group-hover:text-[#dc2626] transition-colors" />
            </motion.a>
            <motion.a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border-2 transition-all duration-300 group"
              style={{ borderColor: 'rgba(255, 0, 0, 0.3)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#dc2626';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-[#dc2626] transition-colors" />
            </motion.a>
            <motion.a
              href={`mailto:${"myemailaddressisgourav@gmail.com"}`}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border-2 transition-all duration-300 group"
              style={{ borderColor: 'rgba(255, 0, 0, 0.3)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#dc2626';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Mail className="w-5 h-5 text-gray-400 group-hover:text-[#dc2626] transition-colors" />
            </motion.a>
          </motion.div>
        </div>

        {/* Divider Line */}
        <div className="relative my-5">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        </div>

        <div className='flex justify-center items-center gap-[40%] md:gap-[72%]'>
          {/* Left content */}
          <div className="text-left">
            <p className="text-lg font-bold">{time}</p>
            <p className="text-sm font-semibold text-gray-200">INDIA
              <img className='h-3 w-7 inline mb-1' src='https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg'></img>
            </p>
          </div>

          {/* Right content */}
          <div className="text-right">
            <p className="text-lg font-bold">©2025</p>
            <p className="text-sm font-semibold text-gray-300">ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;