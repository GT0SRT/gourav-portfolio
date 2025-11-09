import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function Footer2() {

  return (
    <footer className="relative w-full h-12 md:h-32 overflow-hidden text-white flex items-center justify-between px-12">
      {/* Grain + gradient layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,0,0.05)_0%,transparent_70%)] before:absolute before:inset-0 before:opacity-[0.12] before:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
      
      {/* Watermark Text */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        className="absolute mt-0 inset-0 flex items-center justify-center text-[22vw] 
        font-extrabold text-transparent bg-clip-text pt-9 md:pt-32
        bg-gradient-to-b from-red-600 to-transparent select-none"
      >GT0SRT</motion.h1>
    </footer>
  );
}