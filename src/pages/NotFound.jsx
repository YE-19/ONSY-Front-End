import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white p-6 transition-colors duration-300"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center flex flex-col items-center"
      >
        <div className="relative mb-6">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-9xl font-black bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-700 dark:from-teal-400 dark:via-cyan-300 dark:to-teal-500 bg-clip-text text-transparent drop-shadow-sm"
          >
            404
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-teal-200 dark:bg-teal-500/20 rounded-full blur-3xl -z-10" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 text-lg">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <motion.button
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-500 text-white font-bold text-lg shadow-lg shadow-teal-300/50 dark:shadow-teal-900/50 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
