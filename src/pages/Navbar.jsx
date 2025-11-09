import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Education', href: 'education' },
    { name: 'Reviews', href: 'reviews' },
    { name: 'Contact', href: 'contact' }
  ];

  const scrollToSection = (sectionId) => {
    // Close mobile menu first
    setIsOpen(false);

    // Small delay to ensure smooth transition
    setTimeout(() => {
      const element = document.getElementById(sectionId);

      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }; return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-lg border-b' : 'bg-transparent'
        }`}
      style={{ borderColor: scrolled ? 'rgba(255, 0, 0, 0.2)' : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Menu Icon - Left */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" transition-colors text-white hover:text-red-600"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation - Left */}
          {/* <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-300 hover:text-red-600 transition-colors font-medium relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div> */}

          {/* Logo - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold"
            >
              <span className="text-white">GM</span>
              <span className='text-red-600'>.</span>
            </motion.div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => scrollToSection('contact')}
            className="border-2 border-red-600 text-white bg-black hover:text-black hover:bg-red-600 transition-all duration-300"
          >
            Let's Connect
          </Button>
        </div>
      </div>

      {/* Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className=" bg-black/95 backdrop-blur-lg border-t"
            style={{ borderColor: 'rgba(255, 0, 0, 0.8)' }}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left text-gray-300 hover:text-red-600 transition-colors py-2 font-medium pl-[5%]"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;