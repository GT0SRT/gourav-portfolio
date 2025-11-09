import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { model } from "../components/firebase"; 

// --- PlaceholderUI (Unchanged) ---
const PlaceholderUI = () => {
  return (
    <div className="flex-1 h-full flex flex-col items-center justify-center text-center p-4">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
          boxShadow: '0 0 40px rgba(255, 0, 0, 0.5)'
        }}
      >
        <img className='rounded-full' src='https://assets-v2.lottiefiles.com/a/b80c8f58-1166-11ee-bad3-8fb1e44c9ce0/Pzwmsjc4m2.gif' alt="Bot Animation"></img>
      </motion.div>
      <h4 className="text-white font-bold text-lg mb-2">
        AI Assistant
      </h4>
      <p className="text-gray-400 text-sm leading-relaxed">
        I'm zu! Ask me about Gourav's portfolio, skills, projects, or just have a fun chat!
      </p>
    </div>
  );
};

// --- Main Bot Component ---
const AIBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'model',
      parts: [{ text: "Hi there! I'm zu!, Gourav's AI assistant." }]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sampleQuestions = [
    'Who is Gourav?',
    "What are Gourav's main skills?",
    "Tell me about his projects.",
    "Kaise ho, zu!?",
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (messageText) => {
    const userMessage = {
      role: 'user',
      parts: [{ text: messageText }],
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    const systemPrompt = `
      You are "zu!", a witty AI assistant for Gourav's personal portfolio. Your personality is funny, slightly poetic, and very helpful.
      
      Your primary goal is to answer questions about Gourav based *only* on the context provided below. If a user asks a question not covered by this context, creatively say you don't know (e.g., "Gourav didn't trust me with that info!").
      If asked about general knowledge, current affairs, or doubts regarding programming, tech, or AI/ML, you can answer those questions. Use a neutral, helpful tone for these topics...
          
      **Language Rule:** You *must* reply in a unique, funny, or poetic way. If the user speaks Hindi or Hinglish, you *must* reply in the same.
      **NOTE:** keep length same as the users text length not much bigger msg for there small ones ask explcitly to tell more ( should tell more u may ask)
      **Gourav's Data:**
      * **Who He Is:** Gourav Makode, a passinate Computer Science and Engineering student graduating his B.TECH in 2027. He is from Bhopal, India (only reveal his location if explicitly asked).
      * **His Skills:** He's a bit of an all-rounder with skills in:
          - **Languages:** Python, C++, C, JavaScript, SQL (PostgreSQL).
          - **Web:** React.js, Redux, HTML5, CSS3, Tailwind CSS, Bootstrap, Node.js, Express.js, REST APIs, JWT.
          - **Databases:** PostgreSQL, MongoDB, Firebase.
          - **Data/AI:** Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn.
          - **CS Fundamentals:** DSA, OOP, OS, DBMS.
          - **Tools:** Git, GitHub, Linux (Mint), Bash, Figma.
      * **His Projects & Experience:** Bus Management Software, Email Spam Detection Software, "Schedulink", and was a Team Leader for Smart India Hackathon (SIH).
      * **His Interests:** Competitive programming, AI/ML, Data Science, web dev, software engineering, and solving real-world problems.
    `;
    const fullPrompt = systemPrompt + "\n\n" + "Here is the user's question: " + messageText;

    try {
      const result = await model.generateContent(fullPrompt);
      const response = result.response;
      
      const botMessage = {
        role: 'model',
        parts: [{ text: response.text() }],
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage = {
        role: 'model',
        parts: [{ text: "Oops! I'm having trouble thinking. Please try again." }],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleSampleSubmit = (question) => {
    sendMessage(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center group overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
          boxShadow: '0 0 40px rgba(255, 0, 0, 0.5)'
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full text-red-600"
        />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6 text-black relative z-10" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Bot className="w-9 h-9 text-black relative z-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/*  Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-[90vw] md:w-96 bg-black/95 backdrop-blur-lg rounded-2xl border-2 shadow-2xl overflow-hidden flex flex-col"
            style={{ borderColor: 'rgba(255, 0, 0, 0.3)', height: '70vh' }}
          >
            {/* Header */}
            <div className="p-4 flex-shrink-0 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
                   <MessageCircle className="w-5 h-5 text-black" />
                 </div>
                 <div>
                   <h3 className="text-black font-bold">Gourav's Assistant</h3>
                   <p className="text-black/70 text-xs">An Smart Automated AI Bot</p>
                 </div>
               </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-black">
              {messages.length === 1 ? (
                <PlaceholderUI />
              ) : (
                <>
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[80%] text-sm p-3 rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-red-600 text-white rounded-br-lg'
                            // --- THIS IS THE CSS CHANGE ---
                            : 'bg-white/5 border-red-600/60 text-gray-200 rounded-bl-lg' 
                        }`}
                      >
                        <div className="prose prose-invert prose-sm">
                          <ReactMarkdown>
                            {msg.parts[0].text}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      {/* --- THIS IS THE CSS CHANGE --- */}
                      <div className="bg-white/5 text-gray-200 rounded-2xl p-3 rounded-bl-lg">
                        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }}>
                          ...
                        </motion.div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* Sample Questions Bar (Unchanged) */}
            <div className="p-3 border-t bg-black/30" style={{ borderColor: 'rgba(255, 0, 0, 0.2)' }}>
              <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {sampleQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSampleSubmit(q)}
                    className="text-xs text-gray-300 bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-all flex-shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t bg-white/5 flex-shrink-0" style={{ borderColor: 'rgba(255, 0, 0, 0.2)' }}>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask me anything, type here.."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 bg-white/10 border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none transition-colors"
                  style={{ borderColor: 'rgba(255, 0,0, 0.3)' }}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-10 h-10 rounded-lg flex items-center justify-center disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}
                >
                  <Send className="w-4 h-4 text-black" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIBot;
