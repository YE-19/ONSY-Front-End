import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const imageLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const imageRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const Hero5 = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-full overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-800 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 py-20 lg:py-28 flex items-center justify-center transition-colors duration-300"
    >

      {/* Decorative left element */}
      <motion.div variants={imageLeftVariants} className="will-change-transform pointer-events-none absolute left-0 top-0 h-full w-[380px] hidden md:block">
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/10" />
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/8" />
        <div className="absolute -left-8  top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/6" />
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-teal-400/10 blur-3xl" />
        <div className="absolute left-10 top-12 w-2 h-2 rounded-full bg-white/20" />
        <div className="absolute left-24 top-8  w-1.5 h-1.5 rounded-full bg-cyan-300/30" />
        <div className="absolute left-16 bottom-14 w-2.5 h-2.5 rounded-full bg-teal-300/25" />
        <div className="absolute left-6  bottom-20 w-1 h-1 rounded-full bg-white/30" />
      </motion.div>

      {/* Decorative right element */}
      <motion.div variants={imageRightVariants} className="will-change-transform pointer-events-none absolute right-0 top-0 h-full w-[380px] hidden md:block">
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/10" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/8" />
        <div className="absolute -right-8  top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/6" />
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-10 top-12   w-2 h-2 rounded-full bg-white/20" />
        <div className="absolute right-24 top-8    w-1.5 h-1.5 rounded-full bg-cyan-300/30" />
        <div className="absolute right-16 bottom-14 w-2.5 h-2.5 rounded-full bg-teal-300/25" />
        <div className="absolute right-6  bottom-20 w-1 h-1 rounded-full bg-white/30" />
      </motion.div>

      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-white/5 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-24 bg-teal-300/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #99f6e4 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Main content */}
      <motion.div variants={containerVariants} className="relative z-10 flex flex-col items-center gap-10 lg:gap-12 px-6 text-center max-w-3xl mx-auto">

        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-200 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-pulse" />
            Start your journey today
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="will-change-transform font-labrada text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
        >
          You're not alone.{' '}
          <br className="hidden sm:block" />
          Let's talk with{' '}
          <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
            ONSY.
          </span>
        </motion.h2>

        <motion.p variants={itemVariants} className="will-change-transform text-teal-100/70 text-base lg:text-lg leading-relaxed max-w-lg">
          Take the first step toward understanding yourself better. Join thousands already
          on their path to a clearer, calmer mind.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/SignUp")}
            className="will-change-transform group relative overflow-hidden w-full max-w-xs sm:w-56 h-14 rounded-2xl bg-white text-teal-800 font-bold text-lg shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 cursor-pointer transition-shadow duration-300"
          >
            <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-teal-50/60 transition-transform duration-500 group-hover:translate-x-[160%]" />
            <span className="relative flex items-center justify-center gap-2">
              Get Started
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/SignIn")}
            className="will-change-transform group w-full max-w-xs sm:w-56 h-14 rounded-2xl bg-transparent border border-white/30 text-white font-bold text-lg hover:bg-white/10 hover:border-white/50 backdrop-blur-sm cursor-pointer transition-all duration-300"
          >
            Log In
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-5 text-teal-200/60 text-xs font-medium">
          {[
            { icon: '🔒', text: 'End-to-end encrypted' },
            { icon: '✨', text: 'Free to start' },
            { icon: '🧠', text: 'AI-powered insights' },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-1.5">
              <span>{icon}</span>
              {text}
            </span>
          ))}
        </motion.div>

      </motion.div>
    </motion.section>
  )
}

export default Hero5