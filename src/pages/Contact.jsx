import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare } from 'lucide-react'; // Using lucide-react for icons
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.send(
        serviceID,
        templateID,
        formData,
        publicKey
      );

      // Success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      // Error
      console.error("EmailJS Error:", error);
      setSubmitStatus('error');

    } finally {
      // 4. This runs whether it succeeded or failed
      setIsSubmitting(false);
      // Clear status message after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }
};

  return (
    <section id="contact" className="w-full md:py-24 text-white mb-12">
        {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-20"
            >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-red-600">
                  CONTACT
                </h2>
            <div className="w-32 h-1 mx-auto bg-red-600" />
        </motion.div>

      <div className="max-w-4xl mx-auto px-6 md:grid md:grid-cols-7 gap-20">
        {/* HEADING */}
        <div className="text-center md:flex md:col-span-3 mb-12 items-center justify-center md:flex-col">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-red-600">Touch</span>
          </h2>
          <p className="text-lg text-gray-400">
            Have a project in mind or just want to say hi? Feel free to reach out.
          </p>
        </div>

        {/* FORM CONTAINER */}
        <div className="col-span-7 md:col-span-3 md:w-[40vw] mt-5 mx-auto bg-white/5 backdrop-blur-lg rounded-2xl border border-red-600/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Field */}
            <div className="relative">
              <label 
                htmlFor="name" 
                className="absolute -top-3 left-4 bg-red-600 rounded-xl px-1 text-sm text-white"
              >
                Full Name
              </label>
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Your Name"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label 
                htmlFor="email" 
                className="absolute -top-3 left-4 bg-red-600 rounded-xl px-1 text-sm text-white"
              >
                Email Address
              </label>
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="you@example.com"
              />
            </div>

            {/* Message Field */}
            <div className="relative">
              <label 
                htmlFor="message" 
                className="absolute -top-3 left-4 bg-red-600 rounded-xl px-1 text-sm text-white"
              >
                Your Message
              </label>
              <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-gray-500" />
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Your message..."
              ></textarea>
            </div>

            {/* SUBMIT BUTTON & STATUS */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
              
              {/* Submission Status Message */}
              {submitStatus === 'success' && (
                <p className="text-green-400">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400">Something went wrong. Please try again.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;