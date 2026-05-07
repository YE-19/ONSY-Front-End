import React from 'react';
import { motion } from 'framer-motion';
import icon from '../../assets/iconP.png';

const Hero3 = () => {

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const features = [
    {
      number: "1",
      title: "Emotion-Aware Responses",
      body: "Every conversation builds a deeper model of who you are — your triggers, your patterns, your growth.",
      icon: (
        <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      number: "2",
      title: "Learns Over Time",
      body: "The AI detects anxiety, sadness, or joy in your words and responds appropriately — never robotic, always human.",
      icon: (
        <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      number: "3",
      title: "Private & Secure",
      body: "End-to-end encrypted. Your thoughts stay yours — never shared, never trained on without consent.",
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 py-20 px-6 lg:px-16 xl:px-24 transition-colors duration-300">

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-cyan-400/10 dark:bg-cyan-400/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] rounded-full bg-teal-300/10 dark:bg-teal-300/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-600/10 dark:bg-teal-600/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, #99f6e4 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-teal-400/20 to-transparent" />
        <div className="absolute bottom-0 left-1/3 w-full h-px bg-gradient-to-r from-transparent via-teal-400/15 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-16 lg:gap-10 max-w-7xl mx-auto">

        {/* Left side */}
        <motion.div
          className="flex flex-col gap-10 w-full lg:w-[48%]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-200 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-pulse" />
              Your Mental Companion
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-gabarito text-4xl lg:text-5xl xl:text-6xl leading-tight"
          >
            <span className="text-white/90 font-bold block">Your Personal</span>
            <span className="text-white font-bold block mt-1">Mental Companion</span>
            <span className="text-white/90 font-bold block mt-1">Is Always Here</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-teal-100/80 text-base lg:text-lg leading-relaxed max-w-lg">
            More than a chatbot — ONSY listens deeply, understands context, detects hidden
            emotions, and adapts its responses to what you truly need in the moment.
          </motion.p>

          <div className="flex flex-col gap-4">
            {features.map(({ number, title, body, icon: featureIcon }) => (
              <motion.div
                key={number}
                variants={fadeInUp}
                className="group flex items-start gap-5 p-6 rounded-2xl bg-white/8 border border-white/12 backdrop-blur-sm hover:bg-white/14 hover:border-white/25 hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-default"
              >
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/15 group-hover:scale-110 transition-transform duration-300">
                  {featureIcon}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-white font-semibold text-base lg:text-lg leading-snug">{number}. {title}</h3>
                  <p className="text-teal-200/70 text-sm lg:text-base leading-relaxed">{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side — Chat UI */}
        <motion.div
          className="flex flex-col w-full lg:w-[46%] lg:pt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="rounded-3xl border border-white/15 bg-white/8 backdrop-blur-md shadow-2xl shadow-black/30 overflow-hidden">

            {/* Window chrome */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/10 bg-white/5">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <span className="w-3 h-3 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-teal-200/60 text-xs font-medium tracking-wide">ONSY · AI Companion</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[10px] text-emerald-300/80 font-medium">Live</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-4 p-5 lg:p-6">
              <motion.div variants={fadeInUp} className="flex items-end gap-3">
                <div className="shrink-0 w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-900/40">
                  <span className="text-white text-[10px] font-bold font-labrada leading-none">ON</span>
                </div>
                <div className="max-w-[80%] bg-white/15 border border-white/15 text-white rounded-2xl rounded-bl-sm px-4 py-3 text-sm lg:text-base leading-relaxed backdrop-blur-sm shadow-sm">
                  Good morning! I noticed from your brainwave data that your focus is lower than usual today. How are you feeling? 🌤️
                  <p className="text-teal-200/50 text-[10px] mt-1.5 text-right">09:14 AM</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-end justify-end gap-3">
                <div className="max-w-[80%] bg-white text-slate-800 rounded-2xl rounded-br-sm px-4 py-3 text-sm lg:text-base leading-relaxed shadow-sm">
                  Honestly, I didn't sleep well and I'm anxious about my presentation
                  <p className="text-slate-400 text-[10px] mt-1.5 text-right">09:15 AM</p>
                </div>
                <img src={icon} alt="User avatar" className="shrink-0 w-9 h-9 rounded-2xl object-cover shadow-md" />
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-end gap-3">
                <div className="shrink-0 w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-900/40">
                  <span className="text-white text-[10px] font-bold font-labrada leading-none">ON</span>
                </div>
                <div className="max-w-[80%] bg-white/15 border border-white/15 text-white rounded-2xl rounded-bl-sm px-4 py-3 text-sm lg:text-base leading-relaxed backdrop-blur-sm shadow-sm">
                  That's completely understandable. Pre-presentation anxiety is your mind preparing you — it means you care. Let's do a quick breathing exercise to ground you first. Ready?
                  <p className="text-teal-200/50 text-[10px] mt-1.5 text-right">09:15 AM</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-end gap-3">
                <div className="shrink-0 w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-900/40">
                  <span className="text-white text-[10px] font-bold font-labrada leading-none">ON</span>
                </div>
                <div className="bg-white/10 border border-white/15 rounded-2xl rounded-bl-sm px-5 py-3.5 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Input bar */}
            <div className="px-5 pb-5">
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/15 px-4 py-3 backdrop-blur-sm">
                <span className="flex-1 text-sm text-teal-200/40 select-none">Type a message…</span>
                <button className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-400 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
                  <svg className="w-4 h-4 text-white -rotate-45 translate-x-0.5 -translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 mt-4">
            <svg className="w-3.5 h-3.5 text-teal-300/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[11px] text-teal-200/50 tracking-wide">End-to-end encrypted · Your data stays private</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero3;