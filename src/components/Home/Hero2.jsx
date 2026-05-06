import React from 'react'
import { motion } from 'framer-motion'
import icon1 from '../../assets/Frame 55 1.png';
import icon2 from '../../assets/Frame 55 2.png';
import icon3 from '../../assets/Frame 55 3.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const steps = [
  { icon: icon1, alt: "Icon 1", step: "01", title: "Talk to ChatBot", description: "Chat about your day, vent, or reflect in a safe, private space designed to understand your tone.", accent: "from-teal-400 to-cyan-400", glow: "shadow-teal-200/60 dark:shadow-teal-900/40", ring: "ring-teal-200/50 dark:ring-teal-700/30", badge: "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400" },
  { icon: icon2, alt: "Icon 2", step: "02", title: "Track your mood", description: "Our AI analyzes sentiment and emotional patterns over time seamlessly in the background.", accent: "from-cyan-400 to-sky-400", glow: "shadow-cyan-200/60 dark:shadow-cyan-900/40", ring: "ring-cyan-200/50 dark:ring-cyan-700/30", badge: "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400", featured: true },
  { icon: icon3, alt: "Icon 3", step: "03", title: "Get insights", description: "Receive personalized tips to improve your mental wellbeing based on your tracked data.", accent: "from-sky-400 to-teal-400", glow: "shadow-sky-200/60 dark:shadow-sky-900/40", ring: "ring-sky-200/50 dark:ring-sky-700/30", badge: "bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400" },
]

const Hero2 = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/80 to-teal-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-20 lg:py-28 px-6 lg:px-10 transition-colors duration-300">

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-teal-100/40 dark:from-teal-900/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-gradient-to-tr from-cyan-100/30 dark:from-cyan-900/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tl from-teal-100/30 dark:from-teal-900/15 to-transparent rounded-full blur-3xl" />
        <div className="hidden lg:block absolute top-[54%] left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-teal-200/70 dark:via-teal-700/50 to-transparent" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="mb-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200/60 dark:border-teal-700/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse" />
            How It Works
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="will-change-transform font-semibold text-3xl lg:text-[52px] text-center text-slate-900 dark:text-slate-100 leading-tight tracking-tight mb-4"
        >
          Three steps to a{' '}
          <span className="bg-gradient-to-r from-teal-600 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            clearer mind
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="will-change-transform text-slate-500 dark:text-slate-400 text-center mb-14 text-sm lg:text-lg leading-relaxed max-w-xl px-4"
        >
          ONSY uniquely combines AI conversation, behavioral tracking, and biometric
          brainwave data to give you the deepest self-understanding possible.
        </motion.p>

        <motion.div className="flex flex-col lg:flex-row items-stretch justify-center gap-5 lg:gap-6 w-full">
          {steps.map(({ icon, alt, step, title, description, accent, glow, ring, badge, featured }) => (
            <motion.div
              key={step}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`will-change-transform group relative flex-1 flex flex-col items-center text-center gap-5 pt-10 pb-8 px-8 rounded-3xl cursor-default bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 ring-1 ${ring} shadow-xl ${glow} transition-all duration-300 hover:shadow-2xl hover:border-transparent ${featured ? 'lg:scale-[1.04] lg:shadow-2xl' : ''}`}
            >
              {featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md shadow-teal-300/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-pulse" />
                    Most Popular
                  </span>
                </div>
              )}
              <span className={`absolute top-5 right-5 text-[11px] font-bold tracking-widest rounded-full px-2.5 py-0.5 ${badge}`}>{step}</span>
              <div className={`relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${accent} shadow-lg ${glow} transition-transform duration-300 group-hover:scale-110`}>
                <img src={icon} alt={alt} className="w-10 h-10 object-contain drop-shadow-sm" />
              </div>
              <div className={`hidden lg:block absolute left-1/2 -translate-x-1/2 -bottom-[26px] w-3 h-3 rounded-full bg-gradient-to-br ${accent} shadow-sm ring-4 ring-white dark:ring-slate-800 z-10`} />
              <h3 className="font-bold text-xl lg:text-2xl text-slate-900 dark:text-slate-100 leading-snug -mt-1">{title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm lg:text-base leading-relaxed max-w-xs">{description}</p>
              <div className={`mt-auto w-12 h-1 rounded-full bg-gradient-to-r ${accent} opacity-60 group-hover:opacity-100 group-hover:w-20 transition-all duration-500`} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero2